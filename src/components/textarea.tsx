import cn from 'classnames';
import { ChangeEvent, useEffect, useRef } from 'react';

export type TextareaProps = {
  value: string;
  ctrlEnter?: 'submit' | 'newline';
  onChange: (value: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  onFocusChange?: (focused: boolean) => void;
  className?: string;
  innerRef?: (textarea: HTMLTextAreaElement) => void;
};

export const Textarea: React.FC<TextareaProps> = (props) => {
  const { value, ctrlEnter = 'submit', placeholder, onChange, onSubmit, onFocusChange } = props;

  const ref = useRef<HTMLTextAreaElement>();

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

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if ((event.ctrlKey && ctrlEnter === 'submit') || (!event.ctrlKey && ctrlEnter !== 'submit')) {
        onSubmit?.();
        event.preventDefault();
      } else if (event.ctrlKey) {
        onChange(value + '\n');
      }
    }
  };

  useEffect(() => {
    resize(value);
  }, [value]);

  return (
    <textarea
      placeholder={placeholder}
      className={cn(
        'w-full resize-none outline-none text-[13px] rounded-r-lg overflow-hidden max-h-none leading-[18px]',
        props.className
      )}
      ref={(textarea) => {
        ref.current = textarea!;
        props.innerRef?.(textarea!);
      }}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={() => onFocusChange?.(true)}
      onBlur={() => onFocusChange?.(false)}
    />
  );
}
