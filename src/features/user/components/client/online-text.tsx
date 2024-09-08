import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import locale from '@/components/date-fns/ru-short';

import { Model } from '../../model';

export type OnlineTextProps = {
  className?: string;
  user: Model;
}

function format(lastOnlineAt: string): string {
  return formatDistanceToNow(lastOnlineAt, {
    locale,
  });
}

export const OnlineText = (props: OnlineTextProps) => {
  const { user } = props;

  return (
    <div className="text-[13px] text-slate-400 font-normal leading-[16px]">
      {user.online ? 'online' : `заходил ${format(user.lastOnlineAt)}`}
    </div>
  )
};
