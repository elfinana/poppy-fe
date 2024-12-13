import { InputChip } from '@/src/shared';
import { InputHeader, PopupSlider } from '@/src/widgets';
import { ItemCardData } from '@/src/widgets/slider/model';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  const lastUpdate = '12. 02 10:00 업데이트';

  return (
    <div>
      <div>
        <InputHeader />
      </div>
      <div className="flex justify-between mt-16 px-16">
        <div className="text-h3 text-gray-900">최근 검색어</div>
        <div className="text-c1 text-gray-500 underline">지우기</div>
      </div>
      <div className="flex px-16 mt-16 mb-bottomMargin flex-wrap gap-8">
        {recentlySearched.map((item, idx) => (
          <InputChip key={`CHIP_${idx}`} value={item} text={item} />
        ))}
      </div>
      <div className="flex justify-between mt-16 px-16">
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
      {/* <div className="flex mt-16 px-16">
        <div className="text-h3 text-gray-900">최근 본 팝업</div>
      </div> */}
      <div className="flex mt-16 mb-bottomMargin">
        <PopupSlider variant="list" text1="최근 본 팝업" data={recentStores} />
      </div>
    </div>
  );
};

export default Page;

const recentlySearched: Array<string> = [
  '오',
  '오둥',
  '오둥이',
  '오둥이의',
  '오둥이의 ',
  '오둥이의 아',
  '오둥이의 아르',
  '오둥이의 아르바',
  '오둥이의 아르바이',
  '오둥이의 아르바이트',
];

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
