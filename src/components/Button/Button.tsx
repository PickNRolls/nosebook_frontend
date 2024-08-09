'use client';

import cn from 'classnames';

export type ButtonProps = {
  className?: string;
  width?: 'full' | 'auto';
  height?: 'full' | 'lg' | 'md';
  view?: 'default' | 'action' | 'ghost';
  onClick?: () => void;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = (props) => {
  const height = props.height ?? 'lg';
  const view = props.view ?? 'default';
  const width = props.width ?? 'full';
  const className = cn(
    'rounded-lg font-medium text-sm px-4 transition duration-150',
    width === 'full' && 'w-full',
    width === 'auto' && 'w-auto',
    height === 'lg' && 'h-9',
    height === 'md' && 'h-8',
    height === 'full' && 'h-full',
    view === 'default' && 'bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800',
    view === 'action' && 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700',
    view === 'ghost' && 'bg-transparent text-slate-400 font-normal hover:text-slate-600 active:text-slate-900',
    props.className
  );

  return (
    <button className={className} onClick={() => props.onClick?.()}>
      {props.children}
    </button>
  );
};
