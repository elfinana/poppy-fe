'use client';

import { Title } from '@/src/shared';
import {
  CategoryIconList,
  HomeHeader,
  PopupCarouselL,
  PopupSlider,
  BottomNavigation,
  PopupCarouselXL,
  getPopularList,
  getNewList,
  getVisitedList,
  getPlannedList,
} from '@/src/widgets';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50 w-full">
        <HomeHeader />
      </div>
      <div className="w-full">
        <PopupCarouselL />
      </div>
      <div className="w-full px-16">
        <CategoryIconList />
      </div>
      <div className="flex flex-col mt-48 gap-y-48 mb-bottomMargin">
        <div className="w-full">
          <div className="flex flex-col w-full gap-y-12">
            <Title text1="지금 많이 찾는 팝업" category={6} />
            <PopupSlider variant="rank" queryKey="popularList" queryFn={getPopularList} />
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col w-full gap-y-12">
            <Title text1="따끈따끈, 새로 오픈한 팝업" category={7} />
            <PopupSlider variant="list" queryKey="newList" queryFn={getNewList} />
          </div>
        </div>
        <div className="w-full">
          <PopupCarouselXL />
        </div>
        <div className="w-full">
          <div className="flex flex-col w-full gap-y-12">
            <Title text1="예전에 방문했던 팝업" category={8} />
            <PopupSlider variant="list" queryKey="visitedList" queryFn={getVisitedList} />
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col w-full gap-y-12">
            <Title text1="오픈 예정인 팝업" category={9} />
            <PopupSlider variant="list" queryKey="plannedList" queryFn={getPlannedList} />
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Page;
