import { ItemCard } from '@/src/shared';
import React from 'react';
import { ItemCardData } from '../model';

type Props = {
  /**@description 슬라이더 아이템의 크기 및 종류 설정 */
  variant: 'list' | 'gallery' | 'rank' | 'smlist';
  /**@description 슬라이더에 담길 팝업스토어 목록 */
  data: Array<ItemCardData>;
};

export const PopupSlider = ({ ...props }: Props) => {
  return (
    <div className="flex w-full overflow-x-auto gap-4">
      {props.data.map((item, idx) => (
        <ItemCard
          id={item.id}
          key={`ITEMCARD_${idx}`}
          variant={props.variant}
          img={item.img}
          location={item.location}
          title={item.title}
          day={item.day}
          deadLine={item.deadLine}
          rank={idx + 1}
          isCount={item.isCount}
          ml={idx === 0 ? true : false}
          mr={idx === props.data.length - 1 ? true : false}
        />
      ))}
    </div>
  );
};
