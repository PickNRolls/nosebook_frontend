import cn from 'classnames';

import * as featcurrentuser from '@/features/current-user';
import * as featuser from '@/features/user/server';
import * as featchat from '@/features/chat/server';

import { Link } from '@/components/link';

import { Friendship } from './friendship';

export type MainInfoProps = {
  className?: string;
  user: featuser.Model | undefined;
}

export const MainInfo = async (props: MainInfoProps) => {
  const user = props.user;

  const res = await featcurrentuser.api.get();
  const currentUser = res?.data;
  if (!currentUser) {
    return null;
  }

  if (!user || !currentUser) {
    return null;
  }


  return <div className={cn("h-80 rounded-lg bg-slate-100 relative border-slate-200 border", props.className)}>
    <div className="h-24 bg-white rounded-lg absolute bottom-0 w-full flex p-5">
      <featuser.components.Avatar
        className="absolute left-2 -top-16 size-[150px]"
        onlineMarkerClassName="right-[11.5px] bottom-[12px]"
        outline
        user={user}
        canShowOnlineMarker
      />

      <div className="basis-full ml-40 flex">
        <div className="h-full flex items-start flex-col">
          <span className="font-medium text-xl">
            {user.firstName} {user.lastName}
          </span>

          <div className="text-sm text-gray-500">
            Подробнее
          </div>
        </div>

        <div className="ml-auto flex gap-2">
          {currentUser.id !== user.id && (
            <>
              <Friendship user={user} />
              <Link view="button-light" height="md" className="ml-auto flex items-center justify-center size-[32px]" href={featchat.chatPageHref({
                interlocutorId: user.id,
              })}>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <g fill="none" fillRule="evenodd"><path d="M0 0h20v20H0z" opacity=".4"></path><path fill="currentColor" fillRule="nonzero" d="M6.828 15.752a.75.75 0 0 1 .821-.207A7.5 7.5 0 0 0 10.25 16c3.772 0 6.75-2.694 6.75-6s-2.978-6-6.75-6S3.5 6.694 3.5 10c0 1.21.4 2.367 1.14 3.349a.75.75 0 0 1 .15.49c-.04.756-.403 1.785-1.085 3.135 1.483-.116 2.514-.534 3.123-1.222M3.242 18.5a1.204 1.204 0 0 1-1.101-1.767c.644-1.216 1.016-2.14 1.121-2.73A7 7 0 0 1 2 10c0-4.17 3.681-7.5 8.25-7.5S18.5 5.83 18.5 10s-3.681 7.5-8.25 7.5a9 9 0 0 1-2.66-.393c-.996.881-2.456 1.336-4.348 1.393"></path></g>
                </svg>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  </div>;
};

