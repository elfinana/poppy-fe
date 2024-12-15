'use client';

import { ChipListItem } from '@/src/entities';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  InputChip,
} from '@/src/shared';
import { InputHeader, PopupSlider } from '@/src/widgets';
import { ItemCardData } from '@/src/widgets/slider/model';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  const lastUpdate = '12. 02 10:00 업데이트';

  const [recentlySearched, setRecentlySearched] = React.useState([
    { id: 0, text: '일둥이' },
    { id: 1, text: '이둥이' },
    { id: 2, text: '삼둥이' },
    { id: 3, text: '사둥이' },
    { id: 4, text: '오둥이' },
    { id: 5, text: '육둥이' },
  ]);

  const deleteChipsHandler = (chips: ChipListItem) => {
    setRecentlySearched(recentlySearched.filter(val => val.id !== chips.id));
    // 삭제 API 요청
  };

  const deleteAllChipsHandler = () => {
    setRecentlySearched(prev => {
      const arr = [...prev];
      while (arr.length > 0) {
        const deleted = arr.pop();
        // 삭제 API 요청
      }
      return arr;
    });
  };

  return (
    <div>
      <div>
        <InputHeader />
      </div>
      <div className="flex justify-between my-16 px-16">
        <div className="text-h3 text-gray-900">최근 검색어</div>
        <AlertDialog>
          <AlertDialogTrigger variant="enabled">
            <div className="text-c1 text-gray-500 underline cursor-pointer">지우기</div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>최근 검색 삭제</AlertDialogTitle>
              <AlertDialogDescription>검색 기록을 모두 삭제하시겠습니까?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel />
              <AlertDialogAction variant="warning" onClick={deleteAllChipsHandler} />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="flex px-16 min-h-[64px]">
        {recentlySearched.length > 0 ? (
          // 최근 검색 기록이 하나 이상일 경우
          <div className="flex flex-wrap gap-8 w-full h-fit">
            {recentlySearched.map((item, idx) => (
              <InputChip key={`CHIP_${idx}`} value={item.id} text={item.text} onDelete={deleteChipsHandler} />
            ))}
          </div>
        ) : (
          // 최근 검색 기록이 하나도 없을 경우
          <div className="flex justify-center items-center w-full text-b3 text-gray-400">
            최근 검색 내역이 없습니다.
          </div>
        )}
      </div>
      <div className="flex justify-between px-16 mt-16">
        <div className="text-h3 text-gray-900">인기 검색어</div>
        <div className="text-c2 text-gray-400">{lastUpdate}</div>
      </div>
      <div className="grid grid-cols-2 grid-rows-5 grid-flow-col mt-16 mb-bottomMargin px-16 gap-8">
        {mostSearched.map((item, idx) => (
          <div key={`ITEM_${idx}`} className="flex items-center">
            <div className="text-b2 text-gray-900 w-16 text-center">{idx + 1}</div>
            <div className="text-b3 text-gray-900 grow ml-16 truncate">{item}</div>
          </div>
        ))}
      </div>
      <div className="flex mt-16 mb-bottomMargin">
        <PopupSlider variant="list" text1="최근 본 팝업" data={recentStores} />
      </div>
    </div>
  );
};

export default Page;

const mostSearched: Array<string> = [
  '일둥이□■□□□□■□□□',
  '이둥이',
  '삼둥이',
  '사둥이',
  '오둥이',
  '육둥이일이삼사오육칠팔구십십일',
  '칠둥이',
  '팔둥이',
  '구둥이',
  '십둥이',
];

const recentStores: Array<ItemCardData> = [
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
