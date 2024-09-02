import cn from 'classnames';
import { formatDistanceToNow } from 'date-fns';
import locale from '@/components/date-fns/ru-short';

import { Model } from '../../model';

export type OnlineMarkerProps = {
  className?: string;
  user: Model;
  showOnlyOnline?: boolean;
}

function format(lastOnlineAt: string): string {
  return formatDistanceToNow(lastOnlineAt, {
    locale,
  });
}

export const OnlineMarker = (props: OnlineMarkerProps) => {
  const { user } = props;

  if (!user.online) {
    if (props.showOnlyOnline) {
      return null;
    }

    return (
      <div className={cn(props.className, "w-auto h-[23px] translate-x-1/3 rounded-xl px-1 border-white bg-slate-400 text-white font-bold")}>
        {format(user.lastOnlineAt)}
      </div>
    );
  }

  return <div className={cn("bg-green-500 rounded-full border-white", props.className)} />
};
