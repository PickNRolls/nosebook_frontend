import cn from 'classnames';

import * as featcurrentuser from '@/features/current-user';
import * as featuser from '@/features/user/server';

import { Button } from "@/components/button";
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
              <Button width="auto" height="md" className="ml-auto">
                Сообщение
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  </div>;
};

