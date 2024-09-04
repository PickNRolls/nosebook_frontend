'use client';

import { FC, ReactNode, useState } from "react";
import { usePopper } from "react-popper";

export type PopupProps = {
  visible?: boolean;
  anchor: HTMLElement;
  children: ReactNode;
}

export const Popup: FC<PopupProps> = (props) => {
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);
  const popperResult = usePopper(props.anchor, popper, {
    placement: 'bottom-end',
  });

  if (!props.visible) {
    return null;
  }

  return (
    <div {...popperResult.attributes.popper} ref={setPopper} style={popperResult.styles.popper}>
      <div className="bg-white rounded-lg shadow-lg m-2 p-1 border border-slate-200">
        {props.children}
      </div>
    </div>
  );
};
