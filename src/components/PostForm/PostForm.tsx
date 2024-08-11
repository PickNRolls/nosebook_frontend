'use client';

import { ProfileBlock } from "@/components/ProfileBlock";
import { Avatar } from "../Avatar";
import { User } from "@/typings/User";
import { Button } from "../Button";
import { useRef, useState } from "react";
import { Textarea } from "@/components/Textarea";

export type PostFormProps = {
  me: User;
  onSubmit: (value: string) => Promise<boolean>;
};

export const PostForm: React.FC<PostFormProps> = (props) => {
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
    <ProfileBlock className="flex flex-col">
      <div className="flex pl-3">
        <Avatar className="-ml-[2px]" size="xs" user={me} />
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
    </ProfileBlock>
  );
};
