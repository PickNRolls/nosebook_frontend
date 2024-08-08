import { User } from "@/typings/User";
import Image from "next/image";
import AvatarImage from '@/images/avatar.jpg';
import cn from 'classnames';

export type AvatarProps = {
  className?: string;
  user: User;
  size?: 'sm' | 'lg';
  outline?: boolean;
}

export const Avatar = (props: AvatarProps) => {
  const { size = 'lg', outline = true } = props;

  return (
    <div className={cn(
      'rounded-full flex items-center justify-center',
      props.className,
      size === 'lg' && 'size-40',
      size === 'sm' && 'size-12'
    )}>
      <div className={cn(
        'rounded-full border-4',
        outline ? 'border-white' : 'border-transparent',
        size === 'lg' && 'size-36',
        size === 'sm' && 'size-10'
      )}>
        <Image src={AvatarImage} alt="avatar" className="rounded-full" />
      </div>
    </div>
  );
};
