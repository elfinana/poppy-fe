import { FilterChipGroup, FilterChipGroupItem } from '@/src/shared';
import React from 'react';

type Props = {};

const dummyData = [
  {
    id: 1,
    time: '오전 10:00',
  },
  {
    id: 2,
    time: '오전 11:00',
  },
  {
    id: 3,
    time: '오전 12:00',
  },
  {
    id: 4,
    time: '오후 1:00',
  },
  { id: 5, time: '오후 2:00' },
];

const TimeList = (props: Props) => {
  return (
    <FilterChipGroup className="flex overflow-x-auto flex-nowrap gap-8">
      {dummyData.map(({ id, time }, idx) => {
        let className = 'shrink-0';
        if (idx === 0) className += ' ml-16';
        if (idx === dummyData.length - 1) className += ' mr-16'; // 수정 필요
        return <FilterChipGroupItem variant="enabled" key={id} value={time} text={time} className={className} />;
      })}
    </FilterChipGroup>
  );
};

export default TimeList;
