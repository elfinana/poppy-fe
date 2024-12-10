import { ItemCard } from '@/src/shared';
import { CategoryIconList, HomeHeader, ImageSlider, PopupSlider } from '@/src/widgets';
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
      <div className="w-full px-16">
        <PopupSlider />
      </div>
    </div>
  );
};

export default page;
