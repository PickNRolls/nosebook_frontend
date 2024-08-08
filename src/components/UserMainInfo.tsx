import { User } from "@/typings/User";
import AvatarImage from "@/images/avatar.jpg";
import Image from 'next/image';

export type UserMainInfoProps = {
  user: User;
}

export const UserMainInfo = async (props: UserMainInfoProps) => {
  const user = props.user;

  return <div className="h-80 rounded-lg bg-slate-200 relative border-slate-200 border">
    <div className="h-24 bg-white rounded-lg absolute bottom-0 w-full flex p-5">
      <div className="w-36 h-36 rounded-full flex items-center justify-center absolute left-2 bottom-6">
        <div className="w-32 h-32 rounded-full border-4 border-white">
          <Image src={AvatarImage} alt="avatar" className="rounded-full" />
        </div>
      </div>

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
          <button className="rounded-lg h-8 w-28 bg-blue-600 text-white font-medium text-sm ml-auto">
            Сообщение
          </button>
        </div>
      </div>
    </div>
  </div>;
};

