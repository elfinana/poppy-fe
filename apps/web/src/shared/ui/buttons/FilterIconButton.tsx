'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/shared/lib/utils';
import { FilterActive, FilterInactive } from '@/public';

const buttonVariants = cva('inline-flex items-center justify-center w-32 h-32 border rounded', {
  variants: {
    variant: {
      active: 'bg-blue-100 text-blue-500 border-blue-500',
      inactive: 'bg-white text-gray-400 border-gray-200',
    },
  },
  defaultVariants: {
    variant: 'inactive',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const FilterIconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, className }))} ref={ref} {...props}>
        {variant === 'active' ? <FilterActive /> : <FilterInactive />}
      </Comp>
    );
  },
);
FilterIconButton.displayName = 'Button';

export { FilterIconButton, buttonVariants };
