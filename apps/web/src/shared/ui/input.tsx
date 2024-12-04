'use client';

import * as React from 'react';
import { cn } from '@/src/shared/lib/utils';
import { Icon } from './icon';

type InputProps = React.ComponentProps<'input'> & {
  label?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, label, ...props }, ref) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const warningRef = React.useRef<HTMLDivElement>(null);
  const [charCount, setCharCount] = React.useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setCharCount(inputValue.length);

    if (inputValue.length > 10) {
      if (warningRef.current) {
        warningRef.current.style.visibility = 'visible';
      }
    } else if (warningRef.current) {
      warningRef.current.style.visibility = 'hidden';
    }
  };

  return (
    <div className="w-full">
      {label && (
        <span className="text-gray-800 text-b2">
          {label} <span className="text-warning">*</span>
        </span>
      )}
      <div className="relative w-full ">
        <input
          type={type || 'text'}
          ref={ref || inputRef}
          onChange={handleChange}
          className={cn(
            'flex h-[48px] w-full placeholder-gray-300 rounded-md    pl-[12px] pr-[34px] py-[14px] border border-gray-200 focus-visible:outline-none    focus-visible:border-blue-500  md:text-sm',
            className,
          )}
          {...props}
        />
        <Icon className="absolute transform -translate-y-1/2 top-1/2 right-[12px]" icon="ic-delete" />
      </div>
      <div className="flex items-center justify-between mt-[8px]">
        <div ref={warningRef} className="text-sm text-warning" style={{ visibility: 'hidden' }}>
          10자 이내로 입력해 주세요.
        </div>

        <div className="text-gray-300 text-c2">
          <span className={charCount <= 10 ? 'text-blue-500' : 'text-warning'}>{charCount}</span>/10
        </div>
      </div>
    </div>
  );
});

Input.displayName = 'Input';
export { Input };
