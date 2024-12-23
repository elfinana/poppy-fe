'use client';

import { CategoryIconButton } from '@/src/shared';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

export const CategoryIconList = (props: Props) => {
  const router = useRouter();

  return (
    <div className="flex justify-between mt-12">
      <CategoryIconButton category="fb" onClick={() => router.push('/home/more/fb')} />
      <CategoryIconButton category="food" onClick={() => router.push('/home/more/food')} />
      <CategoryIconButton category="art" onClick={() => router.push('/home/more/art')} />
      <CategoryIconButton category="goods" onClick={() => router.push('/home/more/goods')} />
      <CategoryIconButton category="life" onClick={() => router.push('/home/more/life')} />
    </div>
  );
};
