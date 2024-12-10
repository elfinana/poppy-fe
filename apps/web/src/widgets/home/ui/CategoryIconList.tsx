'use client';

import { CategoryIconButton } from '@/src/shared';
import React from 'react';

type Props = {};

export const CategoryIconList = (props: Props) => {
  return (
    <div className="flex justify-between mt-12">
      <CategoryIconButton category="fb" />
      <CategoryIconButton category="food" />
      <CategoryIconButton category="art" />
      <CategoryIconButton category="goods" />
      <CategoryIconButton category="life" />
    </div>
  );
};
