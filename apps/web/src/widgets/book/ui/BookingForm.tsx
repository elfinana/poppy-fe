import React from 'react';
import { Counter } from '@/src/shared';
import TimeList from './TimeList';

type Props = {
  count: number;
  countHandler: () => void;
  discountHandler: () => void;
  time: string[] | undefined;
  onSelectTime: (time: string) => void;
};

const BookingForm = (props: Props) => {
  const { count, countHandler, discountHandler, time, onSelectTime } = props;
  return (
    <div>
      <span className="block m-16 text-gray-900 text-h3">예약 시간</span>
      <TimeList time={time} onSelect={onSelectTime} />
      <span className="block m-16 text-gray-900 text-h3">방문 인원</span>
      <div className="flex justify-between items-center p-16">
        <span>인원</span>
        <Counter count={count} countHandler={countHandler} discountHandler={discountHandler} />
      </div>
    </div>
  );
};

export default BookingForm;
