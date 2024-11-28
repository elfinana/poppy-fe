'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/shared/lib/utils';

const buttonVariants = cva('inline-flex items-center justify-center h-48 px-10 py-14 rounded text-h3 text-white', {
  variants: {
    variant: {
      default: 'bg-blue-500 hover:bg-blue-400 active:bg-blue-800',
      disabled: 'bg-gray-200',
    },
    size: {
      xl: 'w-343',
      lg: 'w-300',
      md: 'w-240',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
PrimaryButton.displayName = 'Button';

export { PrimaryButton, buttonVariants };
