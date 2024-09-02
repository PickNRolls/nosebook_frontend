import cn from 'classnames';

import * as featcurrentuser from '@/features/current-user';

import { Avatar } from "../client/avatar";
import { Button } from "@/components/button";

import { Model } from '../../model';

export type MainInfoProps = {
  className?: string;
  user: Model | undefined;
}

export const MainInfo = async (props: MainInfoProps) => {
  const user = props.user;

  const res = await featcurrentuser.api.get();
  if (!user) {
    return null;
  }

  return <div className={cn("h-80 rounded-lg bg-slate-100 relative border-slate-200 border", props.className)}>
    <div className="h-24 bg-white rounded-lg absolute bottom-0 w-full flex p-5">
      <Avatar
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

        <div className="basis-1/3 ml-auto flex">
          {res?.data && res.data.id !== user.id && (
            <Button width="auto" height="md" className="ml-auto">
              Сообщение
            </Button>
          )}
        </div>
      </div>
    </div>
  </div>;
};

