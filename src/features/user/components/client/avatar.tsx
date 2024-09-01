import Image from "next/image";
import AvatarImage from '@/images/avatar.jpg';
import cn from 'classnames';

import { Model } from '../../model';

export type AvatarProps = {
  className?: string;
  user: Model;
  size?: 'xxs' | 'xs' | 'sm' | 'lg' | 'xxl';
  outline?: boolean;
}

export const Avatar = (props: AvatarProps) => {
  const { size = 'xxl', outline = true } = props;

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
      <Image src={AvatarImage} alt="avatar" className="rounded-full" />
    </div>
  );
};
