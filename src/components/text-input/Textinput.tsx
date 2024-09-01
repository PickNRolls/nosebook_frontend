'use client';

import React from 'react';
import cn from 'classnames';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import { useErrorPopper } from '@/components/error-popper';

export type TextinputProps = {
  placeholder?: string;
  type?: 'text' | 'password';
} & {
  field: ControllerRenderProps<any>;
  fieldState: ControllerFieldState;
};

export const Textinput: React.FC<TextinputProps> = (props) => {
  const { placeholder, field, fieldState } = props;
  const className = cn(
    'w-full h-9 px-3',
    'bg-slate-100 border border-slate-200 rounded-lg',
    'outline-sky-600 outline-1 focus:outline',
    'text-sm',
    fieldState.invalid && 'outline-red-500'
  );

  const { setAnchor, ErrorPopper } = useErrorPopper();

  return (
    <>
      <input
        type={props.type ?? 'text'}
        className={className}
        {...field}
        value={field.value || ''}
        ref={(e) => {
          field.ref(e);
          if (e) {
            setAnchor(e);
          }
        }}
        placeholder={placeholder}
      />
      {fieldState.error && (
        <ErrorPopper>
          {fieldState.error.message}
        </ErrorPopper>
      )}
    </>
  );
};
