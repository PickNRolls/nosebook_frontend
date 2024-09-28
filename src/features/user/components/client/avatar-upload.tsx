'use client';

import React, { FC } from 'react';
import cn from 'classnames';

export type AvatarUploadProps = {
  className?: string;
};

export const AvatarUpload: FC<AvatarUploadProps> = (props) => {
  return (
    <div className={cn(props.className, "hover:bg-black opacity-40 cursor-pointer transition-all")}>
    </div>
  );
};

