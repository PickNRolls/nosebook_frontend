import { FC, useEffect, useRef } from "react";

import * as featws from '@/features/websocket/client';
import * as featuser from '@/features/user/client';
import * as featchat from '@/features/chat/client';
import * as featnotif from '@/features/notification/client';
import * as featcurrentuser from '@/features/current-user';
import { usePathname, useRouter } from "next/navigation";

class MessageNotification implements featnotif.Notification {
  public constructor(private event: featws.Event<'new_message'>) { }

  id(): string {
    return this.event.payload.id;
  }

  title(): string {
    return 'Новое сообщение';
  }

  message(): string {
    return 'прислал вам сообщение'
  }

  producer(): featuser.Model {
    return this.event.payload.author
  }

  href(): string {
    return featchat.chatPageHref({
      chatId: this.event.payload.chatId,
    })
  }
}

export type RootProps = {
  currentUser: featcurrentuser.Model;
}

export const Root: FC<RootProps> = (props) => {
  const { currentUser } = props;

  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  useEffect(() => {
    const ws = featws.ws();

    const unsubWs = ws.onMessage('new_message', (event) => {
      if (event.payload.author.id !== currentUser.id && !pathnameRef.current.startsWith('/chats')) {
        featnotif.service().push(new MessageNotification(event));
      }
    });

    return () => {
      unsubWs();
    };
  }, []);

  return null;
};

