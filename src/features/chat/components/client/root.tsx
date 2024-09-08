import { useEffect } from "react";
import { useRouter } from "next/navigation";

import * as featws from '@/features/websocket/client';
import * as featuser from '@/features/user/client';
import * as featchat from '@/features/chat/client';
import * as featnotif from '@/features/notification/client';

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

export const Root = () => {
  const router = useRouter();

  useEffect(() => {
    const ws = featws.ws();

    const unsubWs = ws.onMessage('new_message', (event) => {
      featnotif.service().push(new MessageNotification(event));

      router.refresh();
    });

    return () => {
      unsubWs();
    };
  }, []);

  return null;
};

