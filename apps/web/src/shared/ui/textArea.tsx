'use client';

import * as React from 'react';
import { cn } from '@/src/shared/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, placeholder, onChange, ...props }, ref) => {
    const warningRef = React.useRef<HTMLDivElement>(null);
    const [charCount, setCharCount] = React.useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const inputValue = e.target.value;
      setCharCount(inputValue.length);

      if (inputValue.length < 20) {
        if (warningRef.current) {
          warningRef.current.style.visibility = 'hidden';
        }
      } else if (warningRef.current) {
        warningRef.current.style.visibility = 'visible';
      }

      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div>
        <textarea
          className={cn(
            'flex min-h-[60px] w-full h-[200px] rounded-md border resize-none px-[12px] py-[12px] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-blue-500 md:text-sm',
            className,
          )}
          ref={ref}
          placeholder={placeholder}
          onChange={handleChange}
          {...props}
        />
        <div className="flex items-center justify-between mt-[8px]">
          <div className="text-sm text-warning" style={{ visibility: charCount > 300 ? 'visible' : 'hidden' }}>
            300자 이내로 입력해 주세요.
          </div>

          <div className="text-gray-300 text-c2">
            <span className={charCount === 0 ? 'text-gray-300' : charCount > 300 ? 'text-warning' : 'text-blue-500'}>
              {charCount}
            </span>
            &nbsp;/ 300
          </div>
        </div>
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
export { Textarea };
