'use client';

import { FC, useState } from "react";

import { Button } from "@/components/button";

export type AddButtonProps = {
  onClick: () => Promise<boolean>;
}

export const AddButton: FC<AddButtonProps> = (props) => {
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
    <Button width="auto" height="md" className="ml-auto" onClick={handleClick}>
      {Boolean(errorMsg) ? errorMsg : sent ? 'Заявка отправлена' : 'Добавить в друзья'}
    </Button>
  );
};
