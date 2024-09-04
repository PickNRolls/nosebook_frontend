'use client';

import React, { FC, ReactNode, useRef, useState } from 'react';

import { Button, ButtonProps } from '@/components/button';
import { Popup } from '@/components/popup';
import { Link, LinkProps } from '@/components/link';


export type PopupButtonOption = {
  type: 'button';
} & ButtonProps;

export type PopupLinkOption = {
  type: 'link';
} & LinkProps;

export type PopupOption = {
  id: string;
} & (PopupButtonOption | PopupLinkOption);

export type PopupOptionsProps = {
  children: ReactNode;
  visible?: boolean;
  options: PopupOption[];
} & ButtonProps;

export const PopupOptions: FC<PopupOptionsProps> = (props) => {
  const { children, options, ...buttonProps } = props;

  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLButtonElement>();

  return (
    <Button
      view="ghost"
      width="auto"
      {...buttonProps}
      innerRef={(node) => ref.current = node}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      <Popup anchor={ref.current!} visible={visible || props.visible}>
        <div className="flex flex-col gap-[2px]">
          {options.map(option => {
            if (option.type === 'button') {
              return (
                <Button as="span" view="list" width="auto" height="md" key={option.id} {...option} />
              );
            }

            if (option.type === 'link') {
              return (
                <Link key={option.id} height="md" view="button-link" {...option} />
              );
            }

            return null;
          })}
        </div>
      </Popup>
    </Button>
  );
};
