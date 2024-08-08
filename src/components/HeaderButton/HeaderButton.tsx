'use client';

import { Avatar } from "@/components/Avatar";
import { User } from "@/typings/User";
import { useState } from "react";
import cn from 'classnames';
import { logout } from "../logout";

export type HeaderButtonProps = {
  me: User;
};

export const HeaderButton = (props: HeaderButtonProps) => {
  const { me } = props;

  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex items-center pl-1 pr-2 ml-auto hover:bg-slate-100 cursor-pointer"
        onClick={() => {
          setVisible(prev => !prev);
        }}
      >
        <Avatar user={me} size="sm" outline={false} />
        <svg className="text-slate-400 -ml-1" fill="none" height="8" viewBox="0 0 12 8" width="12" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M2.16 2.3a.75.75 0 0 1 1.05-.14L6 4.3l2.8-2.15a.75.75 0 1 1 .9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 0 1-.13-1.05z" fill="currentColor" fillRule="evenodd"></path></svg>
      </div>

      <div className={cn("absolute right-0 bg-white w-72", visible ? 'block' : 'hidden')}>
        Menu
        <ul>
          <li
            onClick={async () => {
              await logout();
            }}
          >
            Выйти
          </li>
        </ul>
      </div>
    </div>
  );
};
