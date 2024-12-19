import { SecondaryButton } from '@/src/shared';
import { ChevronHeader } from '@/src/widgets';
import React from 'react';

const dummyData = [
  {
    id: 1,
    order: 1,
    reserver: '신민경',
    phoneNumber: '010-1234-5678',
    people: '2',
  },
  {
    id: 2,
    order: 2,
    reserver: '오세원',
    phoneNumber: '010-1234-5678',
    people: '3',
  },
  {
    id: 3,
    order: 3,
    reserver: '이동규',
    phoneNumber: '010-1234-5678',
    people: '2',
  },
];
const WaitingPage = () => {
  return (
    <>
      <ChevronHeader title="금일 대기 현황" edit={false} />
      <div className="flex flex-col gap-8 p-16 h-screen bg-gray-50">
        {dummyData.map(item => (
          <div key={item.id} className="flex flex-col p-16 bg-white rounded-12 h-[140px]">
            <div className="pb-14 text-gray-800 text-h3">
              대기번호 <span className="text-blue-700">{item.order}</span>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col my-4">
                <div className="flex gap-8 items-center">
                  <div className=" w-[37px] text-b3 text-gray-400">예약자</div>
                  <span className="text-gray-600 text-b2">{item.reserver}</span>
                </div>
                <div className="flex gap-8 items-center">
                  <div className="w-[37px] text-b3 text-gray-400">연락처</div>
                  <span className="text-gray-600 text-b2">{item.phoneNumber}</span>
                </div>
                <div className="flex gap-8 items-center">
                  <div className="w-[37px] text-b3 text-gray-400">인원</div>
                  <span className="text-gray-600 text-b2">{item.people}명</span>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <SecondaryButton size="sm">호출하기</SecondaryButton>
                <SecondaryButton size="sm">입장완료</SecondaryButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WaitingPage;
