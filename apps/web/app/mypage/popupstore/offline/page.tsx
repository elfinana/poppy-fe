'use client';

import { ArrowRightSmall, ExternalLink } from '@/public';
import { ChevronHeader } from '@/src/widgets';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};
type OfflineRouter = 'waiting' | 'edit' | 'history';
const Page = (props: Props) => {
  const router = useRouter();

  const clickHandler = (state: OfflineRouter) => {
    router.push(`/mypage/popupstore/offline/${state}`);
  };

  return (
    <>
      <ChevronHeader title="내 팝업스토어" edit={false} />
      <div className="flex flex-col px-16">
        <div className="flex justify-between items-center py-14" onClick={() => clickHandler('waiting')}>
          <div className="text-gray-800 text-b1">금일 대기 현황</div>
          <ArrowRightSmall />
        </div>
        <div className="flex justify-between items-center py-14" onClick={() => clickHandler('edit')}>
          <div className="text-gray-800 text-b1">대기 수용인원 조회 · 수정</div>
          <ArrowRightSmall />
        </div>
        <div className="flex justify-between items-center py-14" onClick={() => clickHandler('history')}>
          <div className="text-gray-800 text-b1">예약 히스토리</div>
          <ArrowRightSmall />
        </div>
      </div>
    </>
  );
};

export default Page;
