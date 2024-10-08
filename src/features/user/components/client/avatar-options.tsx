'use client';

import { PopupOption, PopupOptions } from '@/components/popup-options';
import React, { FC, useState } from 'react';
import cn from 'classnames';

export type AvatarOptionsProps = {
  className?: string;
  onUpdate?: () => void;
};

export const AvatarOptions: FC<AvatarOptionsProps> = (props) => {
  const [options] = useState<PopupOption[]>(() => {
    return [
      {
        id: 'remove',
        type: 'button',
        px: null,
        children: (
          <div className="flex items-center gap-2 pl-2 pr-4">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-sky-600">
              <path fillRule="evenodd" d="m14.26 7.478-9.038 9.037a1.1 1.1 0 0 0-.322.778V19a.1.1 0 0 0 .1.1h1.707a1.1 1.1 0 0 0 .778-.322l9.037-9.037-2.263-2.263Zm1.272-1.273 2.263 2.263 1.131-1.131a.6.6 0 0 0 0-.849l-1.414-1.414a.6.6 0 0 0-.849 0l-1.13 1.131ZM3.95 15.242 15.391 3.801a2.4 2.4 0 0 1 3.394 0l1.414 1.414a2.4 2.4 0 0 1 0 3.394L8.758 20.051a2.9 2.9 0 0 1-2.05.849H5A1.9 1.9 0 0 1 3.1 19v-1.707a2.9 2.9 0 0 1 .85-2.05Z" clipRule="evenodd"></path>
            </svg>
            Обновить фотографию
          </div>
        ),
        onClick: props.onUpdate,
      },
    ];
  });

  return (
    <PopupOptions className={cn(props.className)} options={options} placement="bottom-start" />
  );
};

