import { formatToMD, ItemCard, ItemCardSkeleton } from '@/src/shared';
import React from 'react';
import { ItemCardData } from '../model';
import { useQuery } from 'react-query';
import { PopupCarouselItem, PopupListItem } from '../../home';
import { formatDay } from '@/src/shared/lib/dateUtils';

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
    <div className="flex w-full gap-4 overflow-x-auto">
      {isLoading ? (
        <div className="flex w-full gap-4 overflow-x-auto">
          <div className="ml-16">
            <ItemCardSkeleton variant={props.variant} />
          </div>
          <div>
            <ItemCardSkeleton variant={props.variant} />
          </div>
          <div>
            <ItemCardSkeleton variant={props.variant} />
          </div>
          <div>
            <ItemCardSkeleton variant={props.variant} />
          </div>
          <div className="mr-16">
            <ItemCardSkeleton variant={props.variant} />
          </div>
        </div>
      ) : (
        data?.map((item, idx) => (
          <ItemCard
            id={item.id}
            key={`ITEMCARD_${idx}`}
            variant={props.variant}
            img={item.thumbnailUrl ? item.thumbnailUrl : 'https://placehold.co/500/webp'}
            location={item.location}
            title={item.name}
            day={`${formatDay({ year: item.startDate.year, month: item.startDate.month, day: item.startDate.day })} - ${formatDay({ year: item.endDate.year, month: item.endDate.month, day: item.endDate.day })}`}
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
