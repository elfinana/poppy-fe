'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/src/shared/lib/utils';
import { Delete } from '@/public';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  value: string;
  text: string;
}

const InputChip = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, value, text, asChild = false, ...props }, ref) => {
    const chipRef = React.useRef<HTMLButtonElement | null>(null);

    const handleDeleteClick = (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      if (chipRef.current) {
        chipRef.current.style.display = 'none';
      }
    };

    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={node => {
          chipRef.current = node;
          if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        className={cn(
          'flex items-center justify-center w-fit pl-9 pr-7 py-8 rounded bg-white border text-b4 text-gray-600 border-gray-200',
          className,
        )}
        {...props}>
        <span className="mr-4">{text}</span>
        <span onClick={handleDeleteClick} className="cursor-pointer">
          <Delete />
        </span>
      </Comp>
    );
  },
);
InputChip.displayName = 'Button';

export { InputChip };
