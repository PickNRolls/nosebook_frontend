import { ReactNode } from "react";
import cn from 'classnames';

export type PageBlockProps = {
  className?: string;
  children: ReactNode;
}

export const PageBlock: React.FC<PageBlockProps> = (props) => {
  return (
    <div className={cn("bg-white rounded-lg border border-slate-200 p-2", props.className)}>
      {props.children}
    </div>
  )
};
