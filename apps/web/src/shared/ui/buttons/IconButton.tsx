'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/shared/lib/utils';

const buttonVariants = cva('flex-shrink-0 block', {
  variants: {
    size: {
      sm: 'w-[16px] h-[16px]',
      md: 'w-[24px] h-[24px]',
      lg: 'w-[26px] h-[26px]',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon:
    | 'AcHome'
    | 'AcMyPage'
    | 'AcMyPlan'
    | 'AcSearch'
    | 'home'
    | 'ic-delete'
    | 'ic-search'
    | 'myPage'
    | 'myPlan'
    | 'notificationOutlined'
    | 'search'
    | 'searchLarge';
}

const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, asChild = false, icon, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ size, className }))} ref={ref} {...props}>
        {icon && (
          <span
            className={`block w-full h-full bg-center bg-no-repeat bg-cover`}
            style={{
              backgroundImage: `url('/icons/${icon}.svg')`,
            }}
          />
        )}
      </Comp>
    );
  },
);

IconButton.displayName = 'Button';

export { IconButton, buttonVariants };
