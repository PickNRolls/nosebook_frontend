'use client';

import { FC, useRef, useState } from "react";

import { Button } from "@/components/button";
import { Popup } from "@/components/popup";

export type RemoveButtonProps = {
  onClick: () => Promise<boolean>;
}

export const RemoveButton: FC<RemoveButtonProps> = (props) => {
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const anchorRef = useRef<HTMLButtonElement>();
  const [visible, setVisible] = useState(false);



  const handleClick = async () => {
    if (sent || errorMsg) {
      return;
    }

    const ok = await props.onClick();
    if (!ok) {
      setErrorMsg('Произошла ошибка');
      return;
    }

    setSent(true);
  }

  return (
    <Button
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      innerRef={button => anchorRef.current = button!}
      view="light"
      width="auto"
      height="md"
      className="ml-auto !p-0 !w-[32px] flex justify-center items-center"
      onClick={handleClick}
    >
      <svg aria-hidden="true" display="block" viewBox="0 0 20 20" width="20" height="20"><path fill="currentColor" fillRule="evenodd" d="M12.5 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8M10 6a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0m-2.968.47a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-2.002-2a.75.75 0 0 1 1.06-1.06l1.471 1.47 2.97-2.97a.75.75 0 0 1 1.06 0Zm5.468 4.28c-1.774 0-3.38.283-4.547.902C6.783 12.27 6 13.26 6 14.688c0 .688.268 1.217.687 1.563.408.337.956.499 1.554.499h8.518c.598 0 1.146-.162 1.555-.499.418-.346.686-.875.686-1.564 0-1.426-.783-2.416-1.953-3.035-1.168-.619-2.773-.902-4.547-.902m-3.845 2.227c.865-.458 2.194-.727 3.845-.727 1.65 0 2.98.27 3.845.727.794.42 1.155.959 1.155 1.71a.7.7 0 0 1-.05.288.3.3 0 0 1-.092.12c-.077.063-.26.155-.599.155H8.241c-.34 0-.522-.092-.6-.156a.3.3 0 0 1-.09-.12.7.7 0 0 1-.051-.287c0-.751.36-1.29 1.155-1.71" clipRule="evenodd"></path></svg>
      <Popup anchor={anchorRef.current!} visible={visible}>
        <div className="flex flex-col gap-[2px]">
          <Button as="span" view="list" width="auto" height="md" onClick={handleClick}>
            Удалить из друзей
          </Button>
        </div>
      </Popup>
    </Button>
  );
};
