'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/shared/lib/utils';

const buttonVariants = cva('inline-flex items-center justify-center', {
  variants: {
    variant: {
      left: 'w-fit h-fit text-b2 text-gray-500',
      underline: 'w-fit h-fit text-c1 text-gray-500 underline',
    },
  },
  defaultVariants: {
    variant: 'left',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const TextButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, className }))} ref={ref} {...props} />;
  },
);
TextButton.displayName = 'Button';

export { TextButton, buttonVariants };
