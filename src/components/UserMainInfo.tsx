import { User } from "@/typings/User";
import { getWhoami } from "@/getWhoami";
import { Avatar } from "./Avatar";

export type UserMainInfoProps = {
  user: User;
}

export const UserMainInfo = async (props: UserMainInfoProps) => {
  const user = props.user;

  const me = await getWhoami();

  return <div className="h-80 rounded-lg bg-slate-200 relative border-slate-200 border">
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
          {!('error' in me) && me.id !== user.id && (
            <button className="rounded-lg h-8 w-28 bg-blue-600 text-white font-medium text-sm ml-auto">
              Сообщение
            </button>
          )}
        </div>
      </div>
    </div>
  </div>;
};

