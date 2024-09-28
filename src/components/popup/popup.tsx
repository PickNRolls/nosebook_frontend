'use client';

import { Placement } from "@popperjs/core";
import { FC, ReactNode, useState } from "react";
import { usePopper } from "react-popper";

export type PopupProps = {
  visible?: boolean;
  anchor: HTMLElement;
  placement?: Placement;
  children: ReactNode;
}

export const Popup: FC<PopupProps> = (props) => {
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);
  const popperResult = usePopper(props.anchor, popper, {
    placement: props.placement || 'bottom-end',
    strategy: 'fixed',
  });

  if (!props.visible) {
    return null;
  }

  return (
    <div {...popperResult.attributes.popper} ref={setPopper} style={popperResult.styles.popper} className="z-10">
      <div className="bg-white rounded-lg shadow-lg mt-2 p-1 border border-slate-200">
        {props.children}
      </div>
    </div>
  );
};
