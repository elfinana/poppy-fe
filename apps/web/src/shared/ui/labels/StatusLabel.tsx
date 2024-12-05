import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/shared/lib/utils';
import { ClockOutlined } from '@/public';

const badgeVariants = cva('flex justify-center items-center rounded-full px-6 py-4 text-c1', {
  variants: {
    status: {
      operational: 'bg-blue-100 text-informative',
      closed: 'bg-purple-100 text-purple-600',
    },
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  status: 'operational' | 'closed';
}

function StatusLabel({ className, status, ...props }: BadgeProps) {
  return status === 'operational' ? (
    <div className={cn(badgeVariants({ status }), className)} {...props}>
      <ClockOutlined className="mr-4" /> 영업중
    </div>
  ) : (
    <div className={cn(badgeVariants({ status }), className)} {...props}>
      영업종료
    </div>
  );
}

export { StatusLabel, badgeVariants };
