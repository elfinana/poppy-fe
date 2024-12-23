import { ItemCard } from '@/src/shared';
import React from 'react';
import { ItemCardData } from '../model';
import { useQuery } from 'react-query';
import { PopupCarouselItem, PopupListItem } from '../../home';

type Props = {
  /**@description 슬라이더 아이템의 크기 및 종류 설정 */
  variant: 'list' | 'gallery' | 'rank' | 'smlist';
  /**@description react query에서 쿼리를 캐싱하기 위해 사용할 key이름(키 이름은 유일해야함) */
  queryKey: string;
  /**@description API 호출 함수 */
  queryFn: () => Promise<Array<PopupListItem>>;
};

export const PopupSlider = ({ ...props }: Props) => {
  const { data, error, isLoading } = useQuery([props.queryKey], props.queryFn);

  return (
    <div className="flex w-full overflow-x-auto gap-4">
      {isLoading ? (
        <div>loading...</div>
      ) : (
        data?.map((item, idx) => (
          <ItemCard
            id={item.id}
            key={`ITEMCARD_${idx}`}
            variant={props.variant}
            img={item.thumbnail}
            location={item.location}
            title={item.name}
            day={`${item.startDate} - ${item.endDate}`}
            deadLine={0}
            rank={idx + 1}
            isCount={item.isAlmostFull}
            ml={idx === 0 ? true : false}
            mr={idx === data.length - 1 ? true : false}
          />
        ))
      )}
    </div>
  );
};
