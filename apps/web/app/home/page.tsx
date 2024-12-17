import {
  CategoryIconList,
  HomeHeader,
  PopupCarouselL,
  PopupSlider,
  BottomNavigation,
  PopupCarouselXL,
} from '@/src/widgets';
import { ItemCardData } from '@/src/widgets/slider/model';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <div className="w-full sticky top-0 z-50">
        <HomeHeader />
      </div>
      <div className="w-full">
        <PopupCarouselL />
      </div>
      <div className="w-full px-16">
        <CategoryIconList />
      </div>
      <div className="w-full mt-48">
        <PopupSlider variant="list" text1="OOO님을 위한 추천 팝업" data={recommandData} category="fb" />
      </div>
      <div className="w-full mt-48">
        <PopupSlider variant="rank" text1="지금 많이 찾는 팝업" data={popularData} category="popular" />
      </div>
      <div className="w-full mt-48">
        <PopupSlider
          variant="list"
          text1="예전에 방문했던 "
          text2={`성동구`}
          text3=" 팝업"
          data={recommandData}
          category="past"
        />
      </div>
      <div className="w-full mt-48">
        <PopupCarouselXL text1="지금 주목해야 할 " text2="패션" text3=" 팝업" />
      </div>
      <div className="w-full mt-48">
        <PopupSlider variant="list" text1="따끈따끈, 새로 오픈한 팝업" data={recommandData} category="new" />
      </div>
      <div className="w-full mt-48">
        <PopupSlider variant="list" text1="오픈 예정인 팝업" data={recommandData} category="planned" />
      </div>
      <div className="h-58 mt-bottomMargin"></div>
      <BottomNavigation />
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

const popularData = [
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
    isCount: false,
  },
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: false,
  },
];
