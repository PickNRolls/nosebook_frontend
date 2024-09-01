import { FC } from "react";
import cn from 'classnames';

import * as featuser from '@/features/user';
import * as featcurrentuser from '@/features/current-user';

import { Textarea } from "@/components/textarea";

export type PostCommentInputProps = {
  me: featcurrentuser.Model;
  comment: string;
  onCommentChange: (comment: string) => void;
  onSubmit: () => void;
  submitDisabled?: boolean;
  textareaRef?: (textarea: HTMLTextAreaElement) => void;
}

export const PostCommentInput: FC<PostCommentInputProps> = (props) => {
  return (
    <div className="flex px-5 py-[10px] border-t border-slate-200 -mx-2 -mb-2 mt-1">
      <featuser.components.Avatar className="mr-2" user={props.me} outline={false} size="xxs" />
      <Textarea
        className="border border-slate-200 rounded-md leading-[16px] h-[34px] min-h-[34px] py-[7px] pl-[13px] mr-5"
        value={props.comment}
        placeholder="Написать комментарий..."
        onSubmit={props.onSubmit}
        onChange={props.onCommentChange}
        innerRef={props.textareaRef}
      />
      <button
        className={cn(
          "flex justify-center items-center",
          "min-w-8 basis-9 text-slate-300 transition duration-100 cursor-default",
          !props.submitDisabled && "hover:text-slate-400 !cursor-pointer"
        )}
        onClick={() => !props.submitDisabled && props.onSubmit()}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="send_24__Page-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="send_24__send_24"><path id="send_24__Rectangle-76" d="M0 0h24v24H0z"></path><path d="M5.74 15.75a39.14 39.14 0 0 0-1.3 3.91c-.55 2.37-.95 2.9 1.11 1.78 2.07-1.13 12.05-6.69 14.28-7.92 2.9-1.61 2.94-1.49-.16-3.2C17.31 9.02 7.44 3.6 5.55 2.54c-1.89-1.07-1.66-.6-1.1 1.77.17.76.61 2.08 1.3 3.94a4 4 0 0 0 3 2.54l5.76 1.11a.1.1 0 0 1 0 .2L8.73 13.2a4 4 0 0 0-3 2.54Z" id="send_24__Mask" fill="currentColor"></path></g></g></svg>
      </button>
    </div>
  );
};
