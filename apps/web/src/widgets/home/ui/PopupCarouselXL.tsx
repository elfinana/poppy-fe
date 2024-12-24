'use client';

import React from 'react';
import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from '@/src/shared/ui/carousel';

import { ArrowRightSmall } from '@/public';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { getHotCategoryList } from '..';

type Props = {};

const PopupCarouselXL = (props: Props) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const hotCategory = React.useRef({ categoryId: 0, categoryName: '' });

  React.useEffect(() => {
    hotCategory.current.categoryId = Math.floor(Math.random() * 5) + 1;

    switch (hotCategory.current.categoryId) {
      case 1:
        hotCategory.current.categoryName = '패션';
        break;
      case 2:
        hotCategory.current.categoryName = '음식';
        break;
      case 3:
        hotCategory.current.categoryName = '아트';
        break;
      case 4:
        hotCategory.current.categoryName = '굿즈';
        break;
      case 5:
        hotCategory.current.categoryName = '라이프';
        break;
    }
  }, []);

  const { data, error, isLoading } = useQuery(
    ['hotCategoryList', hotCategory.current.categoryId],
    () => getHotCategoryList(hotCategory.current.categoryId),
    {
      enabled: hotCategory.current.categoryId > 0,
    },
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex flex-col w-full gap-y-12">
      <div className="flex justify-between items-center w-full px-16">
        <div>
          <span className="text-h2 text-gray-900">지금 주목해야 할 </span>
          <span className="text-h2 text-blue-700">{hotCategory.current.categoryName}</span>
          <span className="text-h2 text-gray-900"> 팝업</span>
        </div>
        <div>
          <ArrowRightSmall />
        </div>
      </div>
      <div>
        <Carousel setApi={setApi} opts={{ loop: true }}>
          <CarouselContent className="ml-0">
            {isLoading ? (
              <CarouselItem className="px-0">
                <div className="relative flex justify-center items-center w-full h-fit aspect-square overflow-hidden rounded bg-gray-100" />
              </CarouselItem>
            ) : (
              data?.map((item, idx) => (
                <CarouselItem key={`CAROUSEL_ITEM_${idx}`} className="px-16">
                  <div className="relative flex justify-center items-center w-full h-fit aspect-square overflow-hidden rounded">
                    <Image
                      src="https://placehold.co/500/webp"
                      alt={`ITEM_${item.id}`}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black/80">
                      <div className="absolute bottom-0">
                        <div className="px-16 text-h1 text-white mb-8">{item.name}</div>
                        <div className="px-16 text-b3 text-white mb-16">{item.description}</div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
        </Carousel>
        {isLoading ? null : (
          <div
            className={`grid grid-cols-${data?.length} grid-rows-1 grid-flow-col gap-4 justify-center items-center w-full mt-8`}>
            {data?.map((_, idx) =>
              current === idx ? (
                <button key={`CAROUSEL_INDC_ITEM${idx}`} className={`border-3 rounded-full border-blue-500 cursor`} />
              ) : (
                <button key={`CAROUSEL_INDC_ITEM${idx}`} className={`border-3 rounded-full border-gray-200 cursor`} />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { PopupCarouselXL };
