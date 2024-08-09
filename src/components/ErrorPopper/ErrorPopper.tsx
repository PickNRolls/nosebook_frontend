import React, { CSSProperties, HTMLAttributes, RefCallback } from "react";
import './ErrorPopper.css';

export type ErrorPopperProps = {
  arrowRef: RefCallback<HTMLDivElement>;
  arrowStyle: CSSProperties;
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const ErrorPopper = React.forwardRef<HTMLDivElement, ErrorPopperProps>(function ErrorPopper(props, ref) {
  const { arrowRef, arrowStyle, children, ...rest } = props;

  return (
    <div ref={ref} {...rest} className="ErrorPopper bg-red-400 text-white text-sm p-1 rounded-md px-2 max-w-52">
      <span className="z-10 relative">
        {children}
      </span>
      <div
        ref={arrowRef}
        className="ErrorPopperArrow"
        style={arrowStyle}
        data-popper-arrow
      />
    </div>
  )
});
