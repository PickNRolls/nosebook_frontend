'use client';

import cn from 'classnames';

export type ButtonProps = {
  className?: string;
  width?: 'full' | 'auto';
  height?: 'lg' | 'md';
  view?: 'default' | 'action' | 'ghost';
  onClick?: () => void;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = (props) => {
  const height = props.height ?? 'lg';
  const view = props.view ?? 'default';
  const width = props.width ?? 'full';
  const className = cn(
    'rounded-lg font-medium text-sm px-4',
    width === 'full' && 'w-full',
    width === 'auto' && 'w-auto',
    height === 'lg' && 'h-9',
    height === 'md' && 'h-8',
    view === 'default' && 'bg-sky-600 text-white',
    view === 'action' && 'bg-green-500 text-white',
    view === 'ghost' && 'bg-transparent text-slate-400 font-normal',
    props.className
  );

  return (
    <button className={className} onClick={() => props.onClick?.()}>
      {props.children}
    </button>
  );
};
