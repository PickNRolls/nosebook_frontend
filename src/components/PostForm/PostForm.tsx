'use client';

import { ProfileBlock } from "@/components/ProfileBlock";
import { Avatar } from "../Avatar";
import { User } from "@/typings/User";
import { Button } from "../Button";
import { useState } from "react";
import cn from 'classnames';

export type PostFormProps = {
  me: User;
  onSubmit: (value: string) => void;
};

export const PostForm: React.FC<PostFormProps> = (props) => {
  const { me, onSubmit } = props;

  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value) {
      event.target.style.height = '1px';
      event.target.style.height = event.target.scrollHeight + 'px';
    } else {
      event.target.style.height = '';
    }

    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.ctrlKey && event.key === 'Enter') {
      onSubmit(value);
    }
  };

  return (
    <ProfileBlock className="flex flex-col">
      <div className="flex">
        <Avatar size="xs" user={me} />
        <textarea
          className={cn(
            'w-full resize-none outline-none text-[13px] rounded-r-lg overflow-hidden max-h-none',
            'pl-2 pr-10 -mt-2 -mb-2 -mr-2',
            'focus:pt-4 focus:pb-4 focus:min-h-20',
            Boolean(value) && 'pt-4 pb-4 min-h-20'
          )}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>

      {(Boolean(value) || focused) && (
        <div className="h-14 flex items-center border-t border-t-slate-200 -ml-2 -mr-2 -mb-2 px-5 py-3">
          <Button
            width="auto"
            height="md"
            className="ml-auto"
            onClick={() => onSubmit(value)}
          >
            Опубликовать
          </Button>
        </div>
      )}
    </ProfileBlock>
  );
};
