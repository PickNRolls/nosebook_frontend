import NextLink from "next/link";
import { FC, ReactNode } from "react";
import cn from 'classnames';

export type LinkProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Link: FC<LinkProps> = (props) => {
  const { href, ...rest } = props;
  const className = cn(
    props.className,
    "text-sky-600 font-medium text-[13px] leading-[14px] inline-block cursor-pointer",
    "hover:underline"
  );

  if (!href) {
    return <span {...rest} className={className}>{props.children}</span>
  }

  return (
    <NextLink {...props} href={href} className={className} />
  );
};
