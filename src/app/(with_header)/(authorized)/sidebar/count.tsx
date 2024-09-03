import React, { FC } from 'react';

export type CountProps = {
  children?: number;
}

export const Count: FC<CountProps> = (props) => {
  if (!props.children) {
    return null;
  }

  let out: React.ReactNode = props.children
  if (out > 99) {
    out = '99+';
  }

  return <div className="bg-slate-400 rounded-full text-white font-medium min-w-[20px] h-[20px] px-1 text-center leading-[18px] ml-auto">
    {out}
  </div>
};
