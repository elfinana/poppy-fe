'use client';

import * as React from 'react';

import { cn } from '@/src/shared/lib/utils';
import Image from 'next/image';

import { Art, Fb, Food, Goods, Life } from '@/public/index';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  category: 'fb' | 'food' | 'art' | 'goods' | 'life';
}

const icons = {
  art: { image: Art, text: '아트' },
  fb: { image: Fb, text: '패션·뷰티' },
  food: { image: Food, text: '음식' },
  goods: { image: Goods, text: '굿즈' },
  life: { image: Life, text: '라이프' },
};

const CategoryIconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, category, asChild = false, ...props }, ref) => {
    return (
      <button className={cn('w-fit h-fit', className)} ref={ref} {...props}>
        <div className="inline-flex items-center justify-center w-fit h-fit border border-gray-100 rounded-16 bg-gray-50">
          <Image src={icons[category].image} alt="art" width="56" height="56" />
        </div>
        <div className="text-b4 text-gray-700">{icons[category].text}</div>
      </button>
    );
  },
);
CategoryIconButton.displayName = 'Button';

export { CategoryIconButton };
