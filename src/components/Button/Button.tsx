'use client';

import cn from 'classnames';

export type ButtonProps = {
  className?: string;
  width?: 'full' | 'auto';
  height?: 'full' | 'lg' | 'md';
  view?: 'default' | 'primary' | 'action' | 'ghost';
  rounded?: 'full' | 'lg';
  px?: 'sm' | 'md';
  onClick?: () => void;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = (props) => {
  const height = props.height ?? 'lg';
  const view = props.view ?? 'primary';
  const width = props.width ?? 'full';
  const rounded = props.rounded ?? 'lg';
  const px = props.px ?? 'md';
  const className = cn(
    'font-medium text-sm transition duration-150',
    width === 'full' && 'w-full',
    width === 'auto' && 'w-auto',
    height === 'lg' && 'h-9',
    height === 'md' && 'h-8',
    height === 'full' && 'h-full',
    view === 'primary' && 'bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800',
    view === 'default' && 'bg-slate-100 text-slate-400 hover:bg-slate-200 active:bg-slate-300',
    view === 'action' && 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700',
    view === 'ghost' && 'bg-transparent text-slate-400 font-normal hover:text-slate-600 active:text-slate-900',
    rounded === 'lg' && 'rounded-lg',
    rounded === 'full' && 'rounded-full',
    px === 'md' && 'px-4',
    px === 'sm' && 'px-3',
    props.className
  );

  return (
    <button className={className} onClick={() => props.onClick?.()}>
      {props.children}
    </button>
  );
};
