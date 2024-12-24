import React from 'react';
import TimeList from './TimeList';
import { Counter, PrimaryButton, SecondaryButton, useCounter } from '@/src/shared';

type Props = {
  count: number;
  countHandler: () => void;
  discountHandler: () => void;
};

const BookingForm = (props: Props) => {
  const { count, countHandler, discountHandler } = props;
  return (
    <div>
      <span className="block m-16 text-gray-900 text-h3">예약 시간</span>
      <TimeList />
      <span className="block m-16 text-gray-900 text-h3">방문 인원</span>
      <div className="flex justify-between items-center p-16">
        <span>인원</span>
        <Counter count={count} countHandler={countHandler} discountHandler={discountHandler} />
      </div>
    </div>
  );
};

export default BookingForm;
