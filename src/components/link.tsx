import NextLink from "next/link";
import { FC, ReactNode } from "react";
import cn from 'classnames';

export type LinkProps = {
  href?: string;
  view?: 'button-link' | 'button' | 'no-style';
  height?: 'md';
  selected?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Link: FC<LinkProps> = (props) => {
  const { href, ...rest } = props;
  const className = cn(
    props.className,
    "text-[13px] leading-[14px] cursor-pointer inline-block",
    props.view == null && "text-sky-600 font-medium hover:underline",
    props.view === 'button-link' && "hover:bg-slate-150 py-2 w-full rounded-md text-black",
    props.view === 'button-link' && props.selected && 'bg-slate-150',
    props.view === 'button' && "text-[14px] font-medium border border-transparent py-[6px] px-2 rounded-md text-slate-400 transition ease-in-out duration-250 hover:bg-slate-100",
    props.view === 'button' && props.selected && "!text-sky-600 !border-slate-200 shadow-sm",
    props.height === 'md' && 'h-8',
  );

  if (!href) {
    return <span {...rest} className={className}>{props.children}</span>
  }

  return (
    <NextLink {...props} href={href} className={className} />
  );
};
