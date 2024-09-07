'use client';

import { FC, useState } from "react";

import { Textarea } from "@/components/textarea";
import { useRouter } from "next/navigation";

export type ChatFooterProps = {
  onChange: (value: string) => Promise<boolean>;
};

export const ChatFooter: FC<ChatFooterProps> = (props) => {
  const [value, setValue] = useState('');
  const router = useRouter();

  return (
    <footer className="px-4 pb-4">
      <Textarea
        className="h-[42px] py-3 shadow-[0_0_2px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.08)] rounded-lg px-5 max-h-[312px]"
        value={value}
        onChange={setValue}
        onSubmit={async () => {
          const ok = await props.onChange(value);
          if (!ok) {
            return;
          }

          setValue('');
          router.refresh();
        }}
        placeholder="Напишите сообщение..."
      />
    </footer>
  );
};

