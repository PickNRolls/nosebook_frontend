import React, { FC } from 'react';

import { Button } from '@/components/button';

export type ModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  header?: React.ReactNode;
};

export const Modal: FC<ModalProps> = (props) => {
  if (!props.visible) {
    return null;
  }

  return (
    <div className="before:bg-black before:opacity-60 before:w-full before:h-full before:block before:absolute before:left-0 before:top-0 before:z-0 z-50 size-full fixed left-0 top-0 flex">
      <div className="min-w-[600px] bg-white py-5 px-6 rounded-xl m-auto relative z-10">
        {props.header != null && (
          <header className="flex items-center -mt-5 -mx-6 px-6 h-[55px] border-b border-b-slate-200 mb-5">
            {props.header}
          </header>
        )}
        {props.children}

        <Button view="ghost" className="absolute top-[14px] -right-10 !w-[28px] h-[28px] !p-0 !rounded-full !bg-[rgba(0,0,0,.15)] !text-white" onClick={props.onClose}>
          <svg aria-hidden="true" display="block" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M7.536 6.264a.9.9 0 0 0-1.272 1.272L10.727 12l-4.463 4.464a.9.9 0 0 0 1.272 1.272L12 13.273l4.464 4.463a.9.9 0 1 0 1.272-1.272L13.273 12l4.463-4.464a.9.9 0 1 0-1.272-1.272L12 10.727z"></path>
          </svg>
        </Button>
      </div>
    </div>
  );
};

