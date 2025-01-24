'use client';
import { ChevronHeader } from '@/src/widgets';
import { useParams } from 'next/navigation';
import React from 'react';

const dummyWaitingData = [
  {
    id: 1,
    reserver: '신민경',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 2,

    reserver: '오세원',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 3,

    reserver: '이동규',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 4,

    reserver: '신민경',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 5,

    reserver: '오세원',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 6,

    reserver: '이동규',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 7,

    reserver: '이동규',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 8,

    reserver: '이동규',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 9,

    reserver: '이동규',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 10,

    reserver: '이동규',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 11,

    reserver: '이동규',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 1,
    reserver: '신민경',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 2,

    reserver: '오세원',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 3,

    reserver: '이동규',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 4,

    reserver: '신민경',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 5,

    reserver: '오세원',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 6,

    reserver: '이동규',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 7,

    reserver: '이동규',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 8,

    reserver: '이동규',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 9,

    reserver: '이동규',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 10,

    reserver: '이동규',
    phoneNumber: '010-1234-5678',
  },
  {
    id: 11,

    reserver: '이동규',
    phoneNumber: '010-1234-5678',
  },
];

type Props = {};

const HistoryListPage = (props?: Props) => {
  const params = useParams();
  return (
    <div className="flex flex-col items-center h-full bg-gray-50">
      <ChevronHeader title="예약 현황" edit={false} />
      <span className="mt-20 text-gray-800 text-h3">{'2024. 11. 19(화) 오후 12:00'}</span>
      <div className="grid overflow-y-auto grid-cols-2 gap-8 px-16 my-16 w-full">
        {dummyWaitingData.map(({ id, reserver, phoneNumber }) => (
          <div key={id} className="bg-white rounded-12 border-[1px] border-gray-100 p-16 flex flex-col gap-2">
            <span className="text-gray-800 text-h4">{reserver}</span>
            <span className="text-gray-600 text-b3">{phoneNumber}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryListPage;
