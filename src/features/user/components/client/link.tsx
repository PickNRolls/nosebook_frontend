import React, { FC } from 'react';

import { Link as LinkComponent } from '@/components/link';

import { Model, fullName, profilePageHref } from '../../model';

export type LinkProps = {
  user: Model;
};

export const Link: FC<LinkProps> = (props) => {
  const { user } = props;

  return (
    <LinkComponent href={profilePageHref(user.id)} className="text-[12.5px] text-black font-medium leading-[18px]">
      {fullName(user)}
    </LinkComponent>
  )
};
