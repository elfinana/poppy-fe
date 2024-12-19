'use client';
import { DatePicker, FilterChipGroup, FilterChipGroupItem, PrimaryButton } from '@/src/shared';
import { ChevronHeader } from '@/src/widgets';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  title: string;
};
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
const HistoryPage = (props: Props) => {
  const selectedDate = '2024. 11. 19(화) 오후 12:00';
  const router = useRouter();
  const onClickHandler = () => {
    router.push(`/mypage/popupstore/offline/history/${selectedDate}`);
  };
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <ChevronHeader title={props.title} edit={false} />

      <DatePicker className="mt-12 px-12 pt-[20px] pb-16 rounded-12 mx-12 border-[1px] border-gray-100 bg-white" />

      <div className="flex flex-col justify-between h-full">
        <div className="py-16 flex flex-col gap-[16px]">
          <span className="pl-16 text-gray-900 text-h3">예약 시간</span>
          <div className="flex overflow-x-auto">
            <FilterChipGroup className="flex flex-nowrap gap-8">
              {dummyData.map(({ id, time }, idx) => {
                let className = 'shrink-0';
                if (idx === 0) className += ' ml-16';
                if (idx === dummyData.length - 1) className += ' mr-16'; // 수정 필요
                return (
                  <FilterChipGroupItem variant="enabled" key={id} value={time} text={time} className={className} />
                );
              })}
            </FilterChipGroup>
          </div>
        </div>

        <div className="mx-16 my-8">
          <PrimaryButton variant="enabled" onClick={onClickHandler}>
            히스토리 보기
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
