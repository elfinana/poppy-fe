'use client';

import React from 'react';
import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from '../../../shared/ui/carousel';

type Props = {};

const carouselItems = [
  {
    id: 0,
    content: 'ITEM 1',
  },
  {
    id: 1,
    content: 'ITEM 2',
  },
  {
    id: 2,
    content: 'ITEM 3',
  },
];

const ImageSlider = (props: Props) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        {carouselItems.map((item, idx) => (
          <CarouselItem key={`CAROUSEL_ITEM_${idx}`} className="px-0">
            <div className="flex justify-center items-center text-4xl font-semibold h-264 bg-gray-100">
              {item.content}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-0 flex justify-center w-full mb-12 px-16">
        {carouselItems.map((item, idx) =>
          current === idx ? (
            <button key={`CAROUSEL_INDC_ITEM${idx}`} className={`w-full border border-white cursor`} />
          ) : (
            <button key={`CAROUSEL_INDC_ITEM${idx}`} className={`w-full border border-white/40 cursor`} />
          ),
        )}
      </div>
    </Carousel>
  );
};

export { ImageSlider };
