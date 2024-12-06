'use client';

import * as React from 'react';
import { cn } from '@/src/shared/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    const warningRef = React.useRef<HTMLDivElement>(null);
    const [charCount, setCharCount] = React.useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const inputValue = e.target.value;
      setCharCount(inputValue.length);

      if (inputValue.length > 20) {
        if (warningRef.current) {
          warningRef.current.style.visibility = 'visible';
        }
      } else if (warningRef.current) {
        warningRef.current.style.visibility = 'hidden';
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
          placeholder="방문하신 팝업스토어의 후기를 남겨주시면, 다른 사용자들에게도 도움이 됩니다."
          onChange={handleChange}
          {...props}
        />
        <div className="flex items-center justify-between mt-[8px]">
          <div ref={warningRef} className="text-sm text-warning" style={{ visibility: 'hidden' }}>
            최소 20자 이상 입력해 주세요.
          </div>

          <div className="text-gray-300 text-c2">
            <span className={charCount <= 20 ? 'text-blue-500' : 'text-warning'}>{charCount}</span>
            &nbsp;/ 최소 20자
          </div>
        </div>
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
export { Textarea };
