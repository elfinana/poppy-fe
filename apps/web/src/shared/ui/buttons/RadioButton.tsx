'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/src/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Radio16Active, Radio20Active } from '@/public';

const radioVariants = cva(
  'flex items-center justify-center aspect-square bg-white rounded-full border-2 border-gray-200 transition-colors',
  {
    variants: {
      size: {
        lg: 'w-20 h-20',
        sm: 'w-16 h-16',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
);

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('flex gap-12', className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

export interface RadioProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioVariants> {
  asChild?: boolean;
  size: 'lg' | 'sm';
  label?: string;
}

const RadioGroupItem = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, RadioProps>(
  ({ className, size, label, id, onChange, ...props }, ref) => {
    const itemId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex items-center gap-2">
        <RadioGroupPrimitive.Item
          ref={ref}
          className={cn(radioVariants({ size, className }))}
          id={itemId}
          onChange={onChange}
          {...props}>
          <RadioGroupPrimitive.Indicator>
            {size === 'lg' ? <Radio20Active /> : <Radio16Active />}
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        {label && (
          <label htmlFor={itemId} className="text-sm text-gray-800 cursor-pointer ">
            {label}
          </label>
        )}
      </div>
    );
  },
);
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
