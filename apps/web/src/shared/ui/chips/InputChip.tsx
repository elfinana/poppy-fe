'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/src/shared/lib/utils';
import { Delete } from '@/public';

export interface InputChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  value: string;
  onDelete: (chips: string) => void;
}

const InputChip = React.forwardRef<HTMLButtonElement, InputChipProps>(
  ({ className, value, onDelete, asChild = false, ...props }, ref) => {
    const chipRef = React.useRef<HTMLButtonElement | null>(null);

    // const handleDeleteClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    //   e.stopPropagation();
    //   if (chipRef.current) {
    //     chipRef.current.style.display = 'none';
    //   }
    // };

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
        <div className="mr-4 text-nowrap">{value}</div>
        <span onClick={() => onDelete(value)} className="cursor-pointer">
          <Delete />
        </span>
      </Comp>
    );
  },
);
InputChip.displayName = 'Button';

export { InputChip };
