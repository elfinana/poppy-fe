'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from '@/public';

import { cn } from '@/src/shared/lib/utils';

const CheckboxButton = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-20 w-20 m-2 flex justify-center items-center bg-white border border-gray-200 shrink-0 rounded-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500',
      className,
    )}
    {...props}>
    <CheckboxPrimitive.Indicator>
      <Check />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
CheckboxButton.displayName = CheckboxPrimitive.Root.displayName;

export { CheckboxButton };
