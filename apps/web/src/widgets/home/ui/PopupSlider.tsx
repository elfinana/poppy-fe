import { ArrowRightSmall } from '@/public';
import { ItemCard } from '@/src/shared';
import React from 'react';
import { ItemCardData } from '../model';

type Props = {
  variant: 'list' | 'gallary' | 'rank';
  text1?: string;
  text2?: string;
  text3?: string;
  data: Array<ItemCardData>;
};

export const PopupSlider = (props: Props) => {
  return (
    <div className="flex flex-col w-full gap-y-12">
      <div className="flex w-full justify-between items-center">
        <div>
          {props.text1 ? <span className="text-h2 text-gray-900">{props.text1}</span> : null}
          {props.text2 ? <span className="text-h2 text-blue-700">{props.text2}</span> : null}
          {props.text3 ? <span className="text-h2 text-gray-900">{props.text3}</span> : null}
        </div>
        <div>
          <ArrowRightSmall />
        </div>
      </div>
      <div className="flex w-full overflow-x-auto gap-4">
        {props.data.map((item, idx) => (
          <ItemCard
            key={`ITEMCARD_${idx}`}
            variant={props.variant}
            img={item.img}
            location={item.location}
            title={item.title}
            day={item.day}
            deadLine={item.deadLine}
            rank={idx + 1}
            isCount={item.isCount}
          />
        ))}
      </div>
    </div>
  );
};
