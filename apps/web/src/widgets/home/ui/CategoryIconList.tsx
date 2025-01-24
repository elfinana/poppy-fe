'use client';

import { CategoryIconButton } from '@/src/shared';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

export const CategoryIconList = (props: Props) => {
  const router = useRouter();

  return (
    <div className="flex justify-between mt-12">
      <CategoryIconButton category="fb" onClick={() => router.push('/home/more/1')} />
      <CategoryIconButton category="food" onClick={() => router.push('/home/more/2')} />
      <CategoryIconButton category="art" onClick={() => router.push('/home/more/3')} />
      <CategoryIconButton category="goods" onClick={() => router.push('/home/more/4')} />
      <CategoryIconButton category="life" onClick={() => router.push('/home/more/5')} />
    </div>
  );
};
