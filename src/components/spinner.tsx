'use client';

import { FC, useEffect, useRef } from "react";

export const Spinner: FC = () => {
  const rotationRef = useRef(0);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let requestId: number;

    const increaseRotation = () => {
      requestId = requestAnimationFrame(() => {
        if (!ref.current) {
          return;
        }

        ref.current.style.rotate = `${rotationRef.current}deg`;
        rotationRef.current += 2;
        rotationRef.current %= 360;
        increaseRotation();
      });
    };

    increaseRotation();

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <span className="shrink-0 size-[16px] h-[40px] text-slate-500 self-center flex items-center">
      <svg ref={ref} fill="currentColor" aria-hidden="true" display="block" viewBox="0 0 16 16" width="16" height="16"><path fillRule="evenodd" d="M8 3.25a4.75 4.75 0 0 0-4.149 7.065.75.75 0 1 1-1.31.732A6.25 6.25 0 1 1 8 14.25a.75.75 0 0 1 .001-1.5 4.75 4.75 0 1 0 0-9.5Z" clipRule="evenodd"></path></svg>
    </span>
  );
};

