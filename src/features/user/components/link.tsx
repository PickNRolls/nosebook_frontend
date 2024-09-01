import React, { FC } from 'react';
import { Model, fullName, profilePageHref } from '../model';

export type LinkProps = {
  user: Model;
};

export const Link: FC<LinkProps> = (props) => {
  const { user } = props;

  return (
    <a href={profilePageHref(user)} className="text-[12.5px] text-black font-medium">
      {fullName(user)}
    </a>
  )
};
