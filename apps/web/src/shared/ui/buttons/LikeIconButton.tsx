'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/shared/lib/utils';
import { LikeActive, LikeInactive } from '@/public';

const buttonVariants = cva(
  'inline-flex items-center justify-center w-fit h-28 px-8 py-6 border border-gray-200 rounded',
  {
    variants: {
      variant: {
        active: 'bg-blue-100 text-blue-500',
        inactive: 'bg-white text-gray-400',
      },
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const LikeIconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, value, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, className }))} ref={ref} {...props}>
        <span className="mr-4">{variant === 'active' ? <LikeActive /> : <LikeInactive />}</span>
        <span className="text-c1">{value}</span>
      </Comp>
    );
  },
);
LikeIconButton.displayName = 'Button';

export { LikeIconButton, buttonVariants };
