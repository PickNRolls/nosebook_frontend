import { User } from "@/typings/User";
import { getWhoami } from "@/getWhoami";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";
import cn from 'classnames';

export type UserMainInfoProps = {
  className?: string;
  user: User | undefined;
}

export const UserMainInfo = async (props: UserMainInfoProps) => {
  const user = props.user;

  const res = await getWhoami();
  if (!user) {
    return null;
  }

  return <div className={cn("h-80 rounded-lg bg-slate-100 relative border-slate-200 border", props.className)}>
    <div className="h-24 bg-white rounded-lg absolute bottom-0 w-full flex p-5">
      <Avatar className="absolute left-2 -top-16" user={user} />

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

