import { FilterChipGroup, FilterChipGroupItem } from '@/src/shared';
import React from 'react';

type Props = {
  time: string[] | undefined;
  onSelect: (time: string) => void;
};

const TimeList = (props: Props) => {
  const { time: timeList, onSelect } = props;
  return (
    <FilterChipGroup className="flex overflow-x-auto flex-nowrap gap-8">
      {timeList?.map((time, idx) => {
        let className = 'shrink-0';
        if (idx === 0) className += ' ml-16';
        if (idx === timeList.length - 1) className += ' mr-16'; // 수정 필요
        return (
          <FilterChipGroupItem
            variant="enabled"
            key={idx}
            value={time}
            text={time}
            className={className}
            onClick={() => onSelect(time)}
          />
        );
      })}
    </FilterChipGroup>
  );
};

export default TimeList;
