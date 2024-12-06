import React from 'react';
import { cn } from '@/src/shared/lib/utils';

type Props = {
  icon: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
};

export const Icon = ({ className, icon, width = 16, height = 16, onClick }: Props) => {
  return (
    <>
      <span
        className={cn('flex-shrink-0 block bg-center bg-no-repeat bg-cover', className)}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: `url('/icons/${icon}.svg')`,
        }}
        onClick={onClick}
      />
    </>
  );
};
