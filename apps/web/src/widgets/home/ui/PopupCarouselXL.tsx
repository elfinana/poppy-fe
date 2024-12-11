'use client';

import React from 'react';
import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from '../../../shared/ui/carousel';

import { ArrowRightSmall } from '@/public';
import Image from 'next/image';

type Props = {
  text1?: string;
  text2?: string;
  text3?: string;
};

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

const PopupCarouselXL = (props: Props) => {
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
    <div className="flex flex-col w-full gap-y-12">
      <div className="flex justify-between items-center w-full px-16">
        <div>
          {props.text1 ? <span className="text-h2 text-gray-900">{props.text1}</span> : null}
          {props.text2 ? <span className="text-h2 text-blue-700">{props.text2}</span> : null}
          {props.text3 ? <span className="text-h2 text-gray-900">{props.text3}</span> : null}
        </div>
        <div>
          <ArrowRightSmall />
        </div>
      </div>
      <div>
        <Carousel setApi={setApi}>
          <CarouselContent className="ml-0">
            {carouselItems.map((item, idx) => (
              <CarouselItem key={`CAROUSEL_ITEM_${idx}`} className="px-16">
                <div className="relative flex justify-center items-center w-full h-fit aspect-square overflow-hidden rounded">
                  <Image src="https://placehold.co/500/webp" alt={`ITEM_${item.id}`} layout="fill" objectFit="cover" />
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black/80">
                    <div className="absolute bottom-0">
                      <div className="px-16 text-h1 text-white mb-8">
                        신영와코루 70년주 기념
                        <br />
                        신영방직 팝업스토어
                      </div>
                      <div className="px-16 text-b3 text-white mb-16">
                        여성의 아름다움을 창조하는 국내 언더웨어
                        <br />
                        대표 브랜드 신영와코루.
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div
          className={`grid grid-cols-${carouselItems.length} grid-rows-1 grid-flow-col gap-4 justify-center items-center w-full mt-8`}>
          {carouselItems.map((_, idx) =>
            current === idx ? (
              <button key={`CAROUSEL_INDC_ITEM${idx}`} className={`border-3 rounded-full border-blue-500 cursor`} />
            ) : (
              <button key={`CAROUSEL_INDC_ITEM${idx}`} className={`border-2 rounded-full border-gray-200 cursor`} />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export { PopupCarouselXL };
