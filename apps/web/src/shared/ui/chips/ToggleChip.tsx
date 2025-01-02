'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/shared/lib/utils';

// 스타일 정의
const toggleChipVariants = cva('flex-inline items-center justify-center w-fit px-12 py-8 rounded text-b3_com', {
  variants: {
    variant: {
      enabled: 'bg-blue-500  text-white text-b2 ',
      disabled: 'bg-white border border-gray-100 text-b3_com text-gray-600 ',
    },
  },
});

interface ToggleChipGroupProps {
  children: React.ReactNode;
  className?: string;
}

const ToggleChipGroup = ({ children, className }: ToggleChipGroupProps) => {
  return <div className={cn('grid gap-2', className)}>{children}</div>;
};

interface ToggleChipItemProps extends VariantProps<typeof toggleChipVariants> {
  value: string;
  text: string;
  isSelected?: boolean; // 초기 선택 상태
  onChange?: (value: string, isSelected: boolean) => void; // 선택 상태 변경 핸들러
  className?: string;
}

const ToggleChipItem = ({ className, value, text, isSelected = false, onChange }: ToggleChipItemProps) => {
  const handleClick = () => {
    const newState = !isSelected;
    onChange?.(value, newState); // 상태 변경을 부모로 전달
  };

  return (
    <button
      className={cn(toggleChipVariants({ variant: isSelected ? 'enabled' : 'disabled', className }))}
      onClick={handleClick}>
      {text}
    </button>
  );
};

export { ToggleChipGroup, ToggleChipItem };
