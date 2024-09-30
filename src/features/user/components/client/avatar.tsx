import Image from "next/image";
import AvatarImage from '@/images/avatar.jpg';
import cn from 'classnames';

import * as featcurrentuser from '@/features/current-user/model';

import { Model } from '../../model';
import { OnlineMarker } from "./online-marker";

export type AvatarProps = {
  className?: string;
  user: Model | featcurrentuser.Model;
  size?: 'xxs' | 'xs' | 'sm' | 'lg' | 'xxl';
  canShowLastOnlineMarker?: boolean;
  showOnlyOnlineMarker?: boolean;
  onlineMarkerClassName?: string;
  outline?: boolean;
}

export const isCurrentUserModel = (m: featcurrentuser.Model | Model): m is featcurrentuser.Model => {
  if (m && (m as featcurrentuser.Model).lastActivityAt) {
    return true;
  }

  return false;
}

export const Avatar = (props: AvatarProps) => {
  const { size = 'xxl', user: u, outline = true, canShowLastOnlineMarker, showOnlyOnlineMarker = false } = props;

  let user: Model;
  if (isCurrentUserModel(u)) {
    user = featcurrentuser.toUserModel(u);
  } else {
    user = u;
  }

  const src = !!user.avatar ? user.avatar.url : AvatarImage;
  const key = !!user.avatar ? user.avatar.updatedAt : '';

  return (
    <div className={cn(
      'rounded-full flex items-center justify-center',
      props.className,
      size === 'xxl' && 'size-40',
      size === 'lg' && 'size-[52px]',
      size === 'sm' && 'size-12',
      size === 'xs' && 'size-9',
      size === 'xxs' && 'size-[36px]',
      outline && 'border-white border-[4px]'
    )}>
      <div className="relative">
        <Image key={key} src={src} unoptimized width={150} height={150} alt="avatar" className="rounded-full" />
        {canShowLastOnlineMarker && (
          <OnlineMarker
            user={user}
            className={cn("absolute size-[20px] text-[12px] leading-[17px] border-[3px] right-0 bottom-0 z-10", props.onlineMarkerClassName)}
            showOnlyOnline={showOnlyOnlineMarker}
          />
        )}
      </div>
    </div>
  );
};
