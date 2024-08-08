'use client';

import cn from 'classnames';

export type ButtonProps = {
  className?: string;
  view?: 'default' | 'action' | 'ghost';
  onClick?: () => void;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = (props) => {
  const view = props.view ?? 'default';
  const className = cn(
    'rounded-lg font-medium text-sm w-full h-9',
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
