import { ItemCard } from '@/src/shared';
import { CategoryIconList, HomeHeader, ImageSlider, PopupSlider } from '@/src/widgets';
import { ItemCardData } from '@/src/widgets/home/model';
import React from 'react';

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="w-full px-16 py-12">
        <HomeHeader />
      </div>
      <div className="w-full">
        <ImageSlider />
      </div>
      <div className="w-full px-16">
        <CategoryIconList />
      </div>
      <div className="w-full px-16 mt-48">
        <PopupSlider variant="list" text1="OOO님을 위한 추천 팝업" data={recommandData} />
      </div>
      <div className="w-full px-16 mt-48">
        <PopupSlider variant="rank" text1="지금 많이 찾는 팝업" data={popularData} />
      </div>
      <div className="w-full px-16 mt-48">
        <PopupSlider variant="list" text1="예전에 방문했던 " text2={`성동구`} text3=" 팝업" data={recommandData} />
      </div>
    </div>
  );
};

export default page;

const recommandData: Array<ItemCardData> = [
  {
    id: 1,
    img: '/images/img-card-1.png',
    location: '서울 영등포구',
    title: '골든볼 팝업스토어',
    day: '05.21(금) - 12.31(일)',
    deadLine: 40,
    isCount: true,
  },
  {
    id: 2,
    img: '/images/img-card-2.png',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: false,
  },
  {
    id: 3,
    img: '/images/img-card-2.png',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: true,
  },
  {
    id: 4,
    img: '/images/img-card-2.png',
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
    img: '/images/img-card-3.png',
    location: '서울 영등포구',
    title: '골든볼 팝업스토어',
    day: '05.21(금) - 12.31(일)',
    deadLine: 40,
    isCount: true,
  },
  {
    id: 2,
    img: '/images/img-card-4.png',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: false,
  },
  {
    id: 3,
    img: '/images/img-card-3.png',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: false,
  },
  {
    id: 4,
    img: '/images/img-card-4.png',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: false,
  },
];
