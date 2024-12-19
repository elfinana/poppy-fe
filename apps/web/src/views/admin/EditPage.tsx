'use client';
import { useCounter } from '@/src/shared/ui/counter/useCounter';
import { PrimaryButton } from '@/src/shared';
import { ChevronHeader } from '@/src/widgets';
import React from 'react';
import Counter from '@/src/shared/ui/counter/Counter';

const EditPage = () => {
  const { enabled, maximumCapacity, maximumCapacityHandler, count, countHandler, discountHandler } = useCounter();

  return (
    <div className="flex flex-col justify-between h-full bg-gray-50">
      <div>
        <ChevronHeader title="대기 수용인원" edit={false} />
        <div className="p-16">
          <span className="text-gray-900 text-h3">
            최대 대기 인원<span className="ml-8 text-blue-600">{maximumCapacity}</span>
          </span>
          <div className="flex justify-between items-center mt-16">
            <span className="text-gray-800 text-b1">인원</span>
            <Counter count={count} countHandler={countHandler} discountHandler={discountHandler} />
          </div>
        </div>
      </div>
      <div className="px-16 py-8">
        <PrimaryButton variant={enabled} onClick={maximumCapacityHandler}>
          적용하기
        </PrimaryButton>
      </div>
    </div>
  );
};

export default EditPage;
