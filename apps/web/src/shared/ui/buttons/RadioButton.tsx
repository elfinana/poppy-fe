'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';

import { cn } from '@/src/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Radio16Active, Radio20Active } from '@/public';

const radioVariants = cva(
  'flex items-center justify-center aspect-square bg-white rounded-full border-1.5 border-gray-200',
  {
    variants: {
      size: {
        lg: 'w-20 h-20',
        sm: 'w-16 h-16',
      },
    },
  },
);

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid', className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

export interface RadioProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioVariants> {
  asChild?: boolean;
  size: 'lg' | 'sm';
}

const RadioGroupItem = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, RadioProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Item ref={ref} className={cn(radioVariants({ size, className }))} {...props}>
        <RadioGroupPrimitive.Indicator>
          {size === 'lg' ? <Radio20Active /> : <Radio16Active />}
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    );
  },
);
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
