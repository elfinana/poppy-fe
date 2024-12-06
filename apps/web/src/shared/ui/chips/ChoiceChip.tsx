'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/src/shared/lib/utils';

const ChoiceChipGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />;
});
ChoiceChipGroup.displayName = RadioGroupPrimitive.Root.displayName;

interface ChoiceChipGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  value: string;
}

const ChoiceChipGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  ChoiceChipGroupItemProps
>(({ className, value, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'flex items-center justify-center w-fit px-8 py-8 bg-white rounded border border-gray-200 text-b4 text-gray-600',
        'data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500',
      )}
      value={value}
      {...props}
    />
  );
});
ChoiceChipGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { ChoiceChipGroup, ChoiceChipGroupItem };
