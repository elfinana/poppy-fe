'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/shared/lib/utils';
import { Art, Fb, Reload } from '@/public';

const buttonVariants = cva('inline-flex items-center justify-center', {
  variants: {
    variant: {
      default: 'bg-white border border-blue-300 text-blue-500 hover:bg-blue-100 active:bg-blue-400 active:text-white',
      disabled: 'bg-white border border-gray-200 text-gray-300 cursor-not-allowed',
    },
    size: {
      md: 'h-48 w-95 px-10 py-14 rounded text-h3',
      sm: 'h-32 w-fit p-8 rounded-20 text-b4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const MapSearchButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        <span className="mr-4">
          <Reload />
        </span>
        <span>{children}</span>
      </Comp>
    );
  },
);
MapSearchButton.displayName = 'Button';

export { MapSearchButton, buttonVariants };
