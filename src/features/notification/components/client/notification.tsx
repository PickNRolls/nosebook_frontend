'use client';

import React, { FC, MouseEvent } from 'react';
import cn from 'classnames';

import * as featuser from '@/features/user/client';
import { useRouter } from 'next/navigation';

export type NotificationProps = {
  producer: featuser.Model;
  title: string;
  message: string;
  href?: string;
  onClose?: () => void;
  innerRef?: (node: HTMLDivElement) => void;
};

export const Notification: FC<NotificationProps> = (props) => {
  const { producer, title, message, href, onClose, innerRef } = props;

  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).nodeName === 'A') {
      return;
    }

    if (href) {
      router.push(href);
      onClose?.();
    }
  };

  return (
    <div
      className={cn(
        "relative text-white rounded-xl text-[12.5px] w-[320px] group",
        href != null && "cursor-pointer",
      )
      }
      onClick={handleClick}
      ref={innerRef}
    >
      <div className="bg-black opacity-75 w-full h-full absolute left-0 top-0 rounded-xl" />
      <div className="relative z-10">
        <header className="font-bold px-3 pt-3 h-[24px] leading-[12px]">
          {title}

          <div
            onClick={onClose}
            className="size-[34px] p-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer absolute right-0 top-0"
          >
            <svg
              aria-hidden="true"
              display="block"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="currentColor"
            >
              <path xmlns="http://www.w3.org/2000/svg" d="m5 3.727 3.464-3.463a.9.9 0 1 1 1.272 1.272l-3.463 3.464 3.463 3.464a.9.9 0 1 1 -1.272 1.272l-3.464-3.463-3.464 3.463a.9.9 0 1 1 -1.272-1.272l3.463-3.464-3.463-3.464a.9.9 0 1 1 1.272-1.272z" fill="currentColor" />
            </svg>
          </div>
        </header>
        <div className="px-3 py-3 flex">
          <featuser.components.Avatar
            user={producer}
            className="!size-[50px] mr-3 shrink-0"
            outline={false}
          />
          <span>
            <featuser.components.Link view="light" user={producer} />
            {" " + message}
          </span>
        </div>
      </div>
    </div>
  );
};

