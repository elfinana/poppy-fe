'use client';

import { ArrowRightSmall } from '@/public';
import { Hr, SecondaryButton } from '@/src/shared';
import { BottomNavigation, ItemCardData, MypageHeader, PopupSlider } from '@/src/widgets';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

type PopUpStoreState = 'offline' | 'online';

const Page = (props: Props) => {
  const router = useRouter();

  const reviewsClickHandler = () => {
    router.push('/mypage/reviews');
  };

  const editClickHandler = () => {
    router.push('/mypage/edit');
  }
  
  // online, offline 유저 개시 팝업스토어 상태에 따라 페이지 이동
  const myPopUpStoreClickHandler = (userState: PopUpStoreState) => {
    if (userState === 'offline') {
      router.push('/mypage/popupstore/offline');
    } else {
      router.push('/mypage/popupstore/online/history');
    }
  };

  const name = '가나다';
  const email = 'asdf1234@gmail.com';
  const reviewsCount = 7;

  return (
    <div className="h-full">
      <div>
        <MypageHeader title="마이페이지" />
      </div>
      <div className="px-16 mt-12">
        <div className="flex justify-between items-center pr-8 pl-16 bg-gray-50 border border-gray-100 rounded-12 py-18">
          <div className="flex flex-col gap-2">
            <div className="text-black text-h2">{name}</div>
            <div className="text-gray-600 text-b3_com">{email}</div>
          </div>
          <div>
            <SecondaryButton size="sm" onClick={editClickHandler}>
              프로필 수정
            </SecondaryButton>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <Hr variant="bold" />
      </div>
      <div className="mt-16">
        <PopupSlider
          variant="smlist"
          category="save"
          text1="저장한 팝업"
          data={recommandData}
          showCount
          typography="h3"
        />
      </div>
      <div className="px-16 mt-20">
        <Hr variant="hairline" />
      </div>
      <div className="flex justify-between items-center px-16 mt-20 w-full" onClick={reviewsClickHandler}>
        <div className="flex gap-4 items-center">
          <span className="text-gray-900 text-h3">작성한 리뷰</span>
          <span className="text-gray-300 text-h4">{reviewsCount}</span>
        </div>
        <div>
          <ArrowRightSmall />
        </div>
      </div>

      <div
        className="flex justify-between items-center px-16 mt-20 w-full"
        onClick={() => myPopUpStoreClickHandler('offline')}>
        <div className="flex gap-4 items-center">
          <span className="text-gray-900 text-h3">내 팝업스토어</span>
        </div>
        <div>
          <ArrowRightSmall />
        </div>
      </div>

      <div className="fixed bottom-0 z-50 w-full">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Page;

const recommandData: Array<ItemCardData> = [
  {
    id: 1,
    img: 'https://placehold.co/500/webp',
    location: '서울 영등포구',
    title: '골든볼 팝업스토어',
    day: '05.21(금) - 12.31(일)',
    deadLine: 40,
    isCount: true,
  },
  {
    id: 2,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: false,
  },
  {
    id: 3,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: true,
  },
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
  },
];
