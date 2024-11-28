'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/shared/lib/utils';

const buttonVariants = cva('inline-flex items-center justify-center h-24 px-5 py-4 rounded-4 text-c2', {
  variants: {
    variant: {
      default:
        'bg-gray-50 border-.5 border-gray-200 text-blue-600 hover:bg-blue-100 active:bg-blue-400 active:text-white',
      disabled: 'bg-gray-50 border border-gray-200 text-gray-300',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const SecondaryXSButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, className }))} ref={ref} {...props} />;
  },
);
SecondaryXSButton.displayName = 'Button';

export { SecondaryXSButton, buttonVariants };
