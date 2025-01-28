'use client';

import React from 'react';
import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from '@/src/shared/ui/carousel';
import { getClosingSoonList } from '..';
import Image from 'next/legacy/image';
import Autoplay from 'embla-carousel-autoplay';
import { useQuery } from 'react-query';
import { CarouselSkeleton } from '@/src/shared';

const PopupCarouselL = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const { data, error, isLoading } = useQuery(['closingSoonList'], getClosingSoonList);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ loop: true }} plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}>
      <CarouselContent>
        {isLoading ? (
          <CarouselSkeleton variant="L" />
        ) : data?.length === 0 ? (
          <CarouselItem className="px-0">
            <div className="relative flex items-center justify-center bg-gray-100 h-264">
              <Image
                src="https://placehold.co/500/webp"
                alt="no popup stores closing soon"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </CarouselItem>
        ) : (
          data?.map((item, idx) => (
            <CarouselItem key={`CAROUSEL_ITEM_${idx}`} className="px-0">
              <div className="relative flex items-center justify-center bg-gray-100 h-264">
                <Image
                  src={item.thumbnailUrl ? item.thumbnailUrl : 'https://placehold.co/500/webp'}
                  alt={`ITEM_${item.id}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </CarouselItem>
          ))
        )}
      </CarouselContent>
      <div className="absolute bottom-0 flex justify-center w-full px-16 mb-12">
        {data?.map((_, idx) =>
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

export { PopupCarouselL };
