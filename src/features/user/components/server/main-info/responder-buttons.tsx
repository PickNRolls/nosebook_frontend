'use client';

import { FC, useRef, useState } from "react";

import { Button } from "@/components/button";
import { Popup } from "@/components/popup";

export type ResponderButtonProps = {
  onAccept: () => Promise<boolean>;
  onDeny: () => Promise<boolean>;
}

export const ResponderButtons: FC<ResponderButtonProps> = (props) => {
  const anchorRef = useRef<HTMLButtonElement>();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        height="md"
        innerRef={(button) => anchorRef.current = button}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        Подписан на вас
        <Popup anchor={anchorRef.current!} visible={visible}>
          <div className="flex flex-col gap-[2px]">
            <Button as="span" view="list" width="auto" height="md" onClick={props.onAccept}>
              Принять
            </Button>
            <Button as="span" view="list" width="auto" height="md" onClick={props.onDeny}>
              Отклонить
            </Button>
          </div>
        </Popup>
      </Button>
    </>
  );
};
