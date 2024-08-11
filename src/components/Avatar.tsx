import { User } from "@/typings/User";
import Image from "next/image";
import AvatarImage from '@/images/avatar.jpg';
import cn from 'classnames';

export type AvatarProps = {
  className?: string;
  user: User;
  size?: 'xs' | 'sm' | 'lg' | 'xxl' | number;
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
      typeof size === 'number' && `size-[${size}px]`
    )}>
      <div className={cn(
        'rounded-full',
        outline && 'b border-4 border-white',
        size === 'xxl' && 'size-36',
        size === 'lg' && 'size-[48px]',
        size === 'sm' && 'size-10',
        size === 'xs' && 'size-9',
        typeof size === 'number' && `size-[${size - 2}px]`
      )}>
        <Image src={AvatarImage} alt="avatar" className="rounded-full" />
      </div>
    </div>
  );
};
