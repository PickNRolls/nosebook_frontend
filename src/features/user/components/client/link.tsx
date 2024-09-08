import React, { FC } from 'react';
import cn from 'classnames';

import { Link as LinkComponent } from '@/components/link';

import { Model, fullName, profilePageHref } from '../../model';

export type LinkProps = {
  user: Model;
  view?: 'dark' | 'light';
  className?: string;
  dropHref?: boolean;
};

export const Link: FC<LinkProps> = (props) => {
  const { user, view } = props;

  const className = cn(
    "text-[13px] text-black font-medium leading-[15px]",
    view === 'dark' && 'hover:no-underline !text-black',
    view === 'light' && '!text-sky-200',
    props.className,
  );

  return (
    <LinkComponent
      className={className}
      href={props.dropHref ? undefined : profilePageHref(user.id)}
    >
      {fullName(user)}
    </LinkComponent >
  )
};
