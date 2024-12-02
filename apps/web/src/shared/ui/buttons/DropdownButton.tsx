'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/shared/lib/utils';
import { DropdownActive, DropdownInactive, FilterActive, FilterInactive } from '@/public';

const buttonVariants = cva('inline-flex items-center justify-center w-fit h-32 border rounded px-8 py-7', {
  variants: {
    variant: {
      active: 'bg-blue-100 text-b2 text-blue-600 border-blue-300',
      inactive: 'bg-white text-b3_com text-gray-600 border-gray-200',
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const DropdownButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, value, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, className }))} ref={ref} {...props}>
        {value}
        {variant === 'active' ? (
          <DropdownActive className="text-blue-500" />
        ) : (
          <DropdownInactive className="text-gray-300" />
        )}
      </Comp>
    );
  },
);
DropdownButton.displayName = 'Button';

export { DropdownButton, buttonVariants };
