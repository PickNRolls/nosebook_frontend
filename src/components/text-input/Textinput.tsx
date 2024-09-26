'use client';

import React from 'react';
import cn from 'classnames';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import { useErrorPopper } from '@/components/error-popper';

export type TextinputProps = {
  className?: string;
  hasOutline?: boolean;
  placeholder?: string;
  type?: 'text' | 'password';
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;

  field?: ControllerRenderProps<any>;
  fieldState?: ControllerFieldState;
};

export const Textinput: React.FC<TextinputProps> = (props) => {
  const { placeholder, hasOutline = true, field, fieldState } = props;
  const className = cn(
    'w-full h-9 px-3',
    'bg-slate-100 border border-slate-200 rounded-lg',
    hasOutline && 'outline-sky-600 outline-1 focus:outline',
    !hasOutline && 'outline-none',
    'text-sm',
    fieldState?.invalid && 'outline-red-500',
    props.className,
  );

  const { setAnchor, ErrorPopper } = useErrorPopper();

  return (
    <>
      <input
        type={props.type ?? 'text'}
        className={className}
        {...field}
        value={field?.value || props.value || ''}
        onChange={event => {
          field?.onChange(event);
          props.onChange?.(event.target.value);
        }}
        onBlur={() => {
          field?.onBlur();
          props.onBlur?.();
        }}
        onFocus={() => {
          props.onFocus?.();
        }}
        ref={(e) => {
          field?.ref(e);
          if (e) {
            setAnchor(e);
          }
        }}
        placeholder={placeholder}
      />
      {fieldState?.error && (
        <ErrorPopper>
          {fieldState.error.message}
        </ErrorPopper>
      )}
    </>
  );
};
