'use client';

import { useState } from "react";

import * as featuser from '@/features/user/client';
import * as featcurrentuser from '@/features/current-user';

import { PageBlock } from "@/components/page-block";
import { Button } from "@/components/button";
import { Textarea } from "@/components/textarea";

export type FormProps = {
  me: featcurrentuser.Model;
  onSubmit: (value: string) => Promise<boolean>;
};

export const Form: React.FC<FormProps> = (props) => {
  const { me, onSubmit } = props;

  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const submit = async () => {
    const ok = await onSubmit(value);
    if (ok) {
      setValue('');
    }
  }


  return (
    <PageBlock className="flex flex-col">
      <div className="flex pl-3">
        <featuser.components.Avatar className="-ml-[2px]" size="xs" user={me} />
        <Textarea
          value={value}
          onChange={setValue}
          onSubmit={submit}
          placeholder="Что у вас нового?"
          onFocusChange={setFocused}
          className="-mt-2 -mb-2 -mr-2 pl-[7px] pr-10 pt-4 focus:pt-4 focus:pb-4 focus:min-h-20"
        />
      </div>

      {(Boolean(value) || focused) && (
        <div className="h-14 flex items-center border-t border-t-slate-200 -ml-2 -mr-2 -mb-2 px-5 py-3">
          <Button
            width="auto"
            height="md"
            className="ml-auto"
            onClick={submit}
          >
            Опубликовать
          </Button>
        </div>
      )}
    </PageBlock>
  );
};
