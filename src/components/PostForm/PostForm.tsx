'use client';

import { ProfileBlock } from "@/components/ProfileBlock";
import { Avatar } from "../Avatar";
import { User } from "@/typings/User";
import { Button } from "../Button";
import { useRef, useState } from "react";
import cn from 'classnames';

export type PostFormProps = {
  me: User;
  onSubmit: (value: string) => Promise<boolean>;
};

export const PostForm: React.FC<PostFormProps> = (props) => {
  const { me, onSubmit } = props;

  const ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const resize = (currentValue: string) => {
    if (!ref.current) {
      return;
    }

    if (currentValue) {
      ref.current.style.height = '1px';
      ref.current.style.height = ref.current.scrollHeight + 'px';
    } else {
      ref.current.style.height = '';
    }
  };

  const submit = async () => {
    const ok = await onSubmit(value);
    if (ok) {
      setValue('');
      resize('');
      ref.current?.blur();
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    resize(event.target.value);
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.ctrlKey && event.key === 'Enter') {
      submit();
    }
  };

  return (
    <ProfileBlock className="flex flex-col">
      <div className="flex pl-3">
        <Avatar className="-ml-[2px]" size="xs" user={me} />
        <textarea
          placeholder="Что у вас нового?"
          className={cn(
            'w-full resize-none outline-none text-[13px] rounded-r-lg overflow-hidden max-h-none leading-[18px]',
            'pl-[7px] pr-10 pt-4 -mt-2 -mb-2 -mr-2',
            'focus:pt-4 focus:pb-4 focus:min-h-20',
            Boolean(value) && 'pt-4 pb-4 min-h-20'
          )}
          ref={ref}
          value={value}
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
            onClick={submit}
          >
            Опубликовать
          </Button>
        </div>
      )}
    </ProfileBlock>
  );
};
