'use client';

import { getRecent10Popups } from '@/src/entities';
import { formatToMD, ItemCard, ItemCardSkeleton } from '@/src/shared';
import { formatDay } from '@/src/shared/lib/dateUtils';
import {
  ChevronHeader,
  ItemCardData,
  PopupListItem,
  getListByCategory,
  getNewList,
  getPlannedList,
  getPopularList,
  getVisitedList,
} from '@/src/widgets';
import React from 'react';
import { useQuery } from 'react-query';
import { useLoginStore } from 'store/login/loginStore';

const Page = ({ params }: { params: { category: string } }) => {
  const categoryId = params.category;
  const { token } = useLoginStore();

  const category = React.useRef({ categoryId: categoryId, categoryName: '' });

  let fetchCategoryData: () => Promise<Array<PopupListItem>>;

  switch (categoryId) {
    case '1':
      category.current.categoryName = '패션·뷰티';
      fetchCategoryData = () => getListByCategory(categoryId);
      break;
    case '2':
      category.current.categoryName = '음식';
      fetchCategoryData = () => getListByCategory(categoryId);
      break;
    case '3':
      category.current.categoryName = '아트';
      fetchCategoryData = () => getListByCategory(categoryId);
      break;
    case '4':
      category.current.categoryName = '굿즈';
      fetchCategoryData = () => getListByCategory(categoryId);
      break;
    case '5':
      category.current.categoryName = '라이프';
      fetchCategoryData = () => getListByCategory(categoryId);
      break;
    case '6':
      category.current.categoryName = '지금 많이 찾는 팝업';
      fetchCategoryData = () => getPopularList();
      break;
    case '7':
      category.current.categoryName = '따끈따끈, 새로 오픈한 팝업';
      fetchCategoryData = () => getNewList();
      break;
    case '8':
      // 로그인 구현 후 수정
      category.current.categoryName = '예전에 방문했던 팝업';
      fetchCategoryData = () => getPlannedList();
      break;
    case '9':
      category.current.categoryName = '오픈 예정인 팝업';
      fetchCategoryData = () => getPlannedList();
      break;
    case '10':
      category.current.categoryName = '주목해야 할 팝업';
      fetchCategoryData = () => getListByCategory(categoryId);
      break;
    case '11':
      category.current.categoryName = '최근 본 팝업';
      fetchCategoryData = () => getRecent10Popups(token);
      break;
    default:
      throw new Error('Invalid category ID');
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['categoryData', categoryId],
    queryFn: () => fetchCategoryData(),
  });

  const variant = 'gallery';
  return (
    <div className="h-full">
      <div className="sticky top-0 z-50">
        <ChevronHeader title={category.current.categoryName} edit={false} />
      </div>
      <div className="grid grid-cols-2 px-16 mt-8 gap-y-32 gap-x-8 pb-bottomMargin">
        {isLoading
          ? Array.from({ length: 8 }, (_, idx) => <ItemCardSkeleton key={`SKEL_${idx}`} variant="imageFull" />)
          : data?.map((item, idx) => (
              <div key={`ITEMCARD_${idx}`} className="flex">
                <ItemCard
                  id={item.id}
                  variant={variant}
                  img={item.thumbnailUrl ? item.thumbnailUrl : 'https://placehold.co/500/webp'}
                  location={item.location}
                  title={item.name}
                  day={`${formatDay({ year: item.startDate.year, month: item.startDate.month, day: item.startDate.day })} - ${formatDay({ year: item.endDate.year, month: item.endDate.month, day: item.endDate.day })}`}
                  deadLine={0}
                  rank={idx + 1}
                  isCount={item.isAlmostFull}
                  ml={false}
                  mr={false}
                  imageFull
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Page;
