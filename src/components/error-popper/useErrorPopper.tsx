import React, { FC, useCallback, useRef, useState } from "react";
import { usePopper } from "react-popper";
import { ErrorPopper } from "./ErrorPopper";
import { Options } from "@popperjs/core";

type ReturnedErrorPopperProps = {
  children: React.ReactNode;
};

export const useErrorPopper = (popperOptions?: Options): {
  setAnchor: (anchor: HTMLElement) => void;
  ErrorPopper: FC<ReturnedErrorPopperProps>
} => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);
  const [arrow, setArrow] = useState<HTMLDivElement | null>(null);
  const popperResult = usePopper(anchor, popper, popperOptions ?? {
    placement: 'right',
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrow
        }
      },
      {
        name: 'offset',
        options: {
          offset: [0, 8]
        }
      }
    ]
  });

  const popperResultRef = useRef<typeof popperResult>();
  popperResultRef.current = popperResult;

  return {
    setAnchor,
    ErrorPopper: useCallback((props: ReturnedErrorPopperProps) => {
      const { attributes, styles } = popperResultRef.current!;

      return (
        <ErrorPopper {...attributes.popper} ref={setPopper} style={styles.popper} arrowStyle={styles.arrow} arrowRef={setArrow}>
          {props.children}
        </ErrorPopper>
      )
    }, [])
  }
};
