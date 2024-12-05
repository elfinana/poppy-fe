'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/shared/lib/utils';
import { FocusActive, FocusInactive } from '@/public';

const buttonVariants = cva(
  'inline-flex items-center justify-center w-40 h-40 bg-white border border-gray-200 rounded-full shadow-16dp',
  {
    variants: {
      variant: {
        active: 'text-blue-500',
        inactive: 'text-gray-400',
      },
    },
    defaultVariants: {
      variant: 'inactive',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const FocusIconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, className }))} ref={ref} {...props}>
        {variant === 'active' ? <FocusActive /> : <FocusInactive />}
      </Comp>
    );
  },
);
FocusIconButton.displayName = 'Button';

export { FocusIconButton, buttonVariants };
