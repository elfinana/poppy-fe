import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/shared/lib/utils';

const operational = 'bg-blue-100 text-blue-600';

const badgeVariants = cva('inline-flex items-center justify-center w-fit rounded-4 px-4 py-4 text-c2', {
  variants: {
    status: {
      operational: operational,
      planned: operational,
      ended: 'bg-purple-100 text-purple-700',
    },
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  status: 'operational' | 'planned' | 'ended';
  daysLeft: number;
}

function DateLabel({ className, daysLeft, status, ...props }: BadgeProps) {
  let text = '';
  switch (status) {
    case 'operational': {
      text = `종료 D-${daysLeft}`;
      break;
    }
    case 'planned': {
      text = `오픈예정`;
      break;
    }
    case 'ended': {
      text = `종료`;
      break;
    }
  }

  return (
    <div className={cn(badgeVariants({ status }), className)} {...props}>
      {text}
    </div>
  );
}

export { DateLabel, badgeVariants };
