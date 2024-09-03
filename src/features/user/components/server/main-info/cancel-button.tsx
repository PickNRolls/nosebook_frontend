'use client';

import { FC, useState } from "react";

import { Button } from "@/components/button";

export type CancelButtonProps = {
  onClick: () => Promise<boolean>;
}

export const CancelButton: FC<CancelButtonProps> = (props) => {
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
    <Button view="default" width="auto" height="md" className="ml-auto" onClick={handleClick}>
      Отписаться
    </Button>
  );
};
