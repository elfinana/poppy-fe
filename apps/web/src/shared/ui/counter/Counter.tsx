'use client';
import { Minus, Plus } from '@/public';
import { Button } from '@/src/shared';
import React from 'react';

type Props = {
  count: number;
  countHandler: () => void;
  discountHandler: () => void;
};

export const Counter = (props: Props) => {
  const { count, countHandler, discountHandler } = props;
  return (
    <div className="flex justify-center items-center px-8 py-10 border-[1px] border-gray-100 rounded-12 gap-[13px]">
      <Button className="p-0 h-24" onClick={discountHandler}>
        <Minus />
      </Button>
      <span className="text-gray-900 text-h2">{count}</span>
      <Button className="p-0 h-24" onClick={countHandler}>
        <Plus />
      </Button>
    </div>
  );
};
