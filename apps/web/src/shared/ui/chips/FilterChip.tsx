'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/shared/lib/utils';

const filterChipVariants = cva('flex-inline items-center justify-center w-fit px-12 py-8 rounded text-b3_com', {
  variants: {
    variant: {
      enabled:
        'bg-white border border-gray-100 text-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500',
      disabled: 'bg-gray-100 text-gray-300 border-gray-100',
    },
  },
});

const FilterChipGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />;
});
FilterChipGroup.displayName = RadioGroupPrimitive.Root.displayName;

interface FilterChipGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof filterChipVariants> {
  variant: 'enabled' | 'disabled';
  value: string;
  text: string;
}

const FilterChipGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  FilterChipGroupItemProps
>(({ className, variant, value, text, ...props }, ref) => {
  return variant === 'enabled' ? (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(filterChipVariants({ variant, className }))}
      value={value}
      {...props}>
      {text}
    </RadioGroupPrimitive.Item>
  ) : (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(filterChipVariants({ variant, className }))}
      value={value}
      onClick={e => {
        e.preventDefault();
      }}
      {...props}>
      {text}
    </RadioGroupPrimitive.Item>
  );
});
FilterChipGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { FilterChipGroup, FilterChipGroupItem };
