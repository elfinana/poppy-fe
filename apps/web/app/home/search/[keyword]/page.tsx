'use client';

import { Sort } from '@/public';
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  Calendar,
  ChoiceChipGroup,
  ChoiceChipGroupItem,
  DatePicker,
  DropdownButton,
  FilterIconButton,
  formatToMD,
  getDateDifference,
  Hr,
  ItemCard,
  ItemCardSkeleton,
  PrimaryButton,
  RadioGroup,
  RadioGroupItem,
  SecondaryButton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ToggleChipGroup,
  ToggleChipItem,
} from '@/src/shared';
import { BottomSheetFooter, BottomSheetTitle } from '@/src/shared/ui/bottomsheet/bottomsheet';
import { InputHeader, ItemCardData, PopupListItem } from '@/src/widgets';
import { getListByName, getPopularList } from '@/src/widgets';
import React from 'react';
import { useQueries, useQuery } from 'react-query';

const locations = [
  '전체',
  '서울',
  '경기',
  '인천',
  '부산',
  '대구',
  '대전',
  '광주',
  '울산',
  '세종',
  '강원',
  '경남',
  '경북',
  '전남',
  '전북',
  '충남',
  '충북',
  '제주',
];

const categories = ['전체', '패션 · 뷰티', '아트', '음식', '굿즈', '라이프'];

const Page = ({ params }: { params: { keyword: string } }) => {
  const [keyword, setKeyword] = React.useState(decodeURIComponent(params.keyword));
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);
  const [filterBottomSheetOpen, setFilterBottomSheetOpen] = React.useState(false);
  const [radioFilter, setRadioFilter] = React.useState('operational');
  const [listOrder, setListOrder] = React.useState('opening');

  const [filterDate, setFilterDate] = React.useState(new Date());
  const [filterLocation, setFilterLocation] = React.useState<Array<string>>(['전체']);
  const [filterRating, setFilterRating] = React.useState('all');
  const [filterCategory, setFilterCategory] = React.useState<Array<string>>(['전체']);

  const [filteredArr, setFilteredArr] = React.useState<Array<PopupListItem>>([]);

  const queries = [
    { queryKey: ['getListByName', keyword], queryFn: () => getListByName(keyword), enabled: !!keyword },
    { queryKey: ['popularList'], queryFn: getPopularList },
  ];

  const results = useQueries(queries);
  const searchResult = results[0]?.data;

  React.useEffect(() => {
    if (searchResult) setFilteredArr(searchResult);
  }, [searchResult]);

  const initializeFilter = () => {
    setFilterDate(new Date());
    setFilterLocation(['전체']);
    setFilterRating('all');
    setFilterCategory(['전체']);
  };

  const setFilters = () => {
    let filtered = searchResult;

    if (filtered !== undefined) {
      // 📅 날짜 필터
      if (filterDate) {
        filtered = filtered.filter(
          item =>
            filterDate >= new Date(`${item.startDate.year}-${item.startDate.month}-${item.startDate.day}`) &&
            filterDate <= new Date(`${item.endDate.year}-${item.endDate.month}-${item.endDate.day}`),
        );
      }
      console.log('날짜 필터');
      console.log(filtered);

      // 📍 위치 필터
      if (filterLocation.length > 0) {
        if (filterLocation[0] !== '전체') filtered = filtered.filter(item => filterLocation.includes(item.location));
      }
      console.log('위치 필터');
      console.log(filtered);

      // ⭐ 평점 필터
      if (filterRating) {
        if (filterRating !== 'all') filtered = filtered.filter(item => item.rating >= Number(filterRating));
      }
      console.log('평점 필터');
      console.log(filtered);

      // 🏷️ 카테고리 필터
      if (filterCategory.length > 0) {
        if (filterCategory[0] !== '전체')
          filtered = filtered.filter(item => filterCategory.includes(item.categoryName));
      }
      console.log('카테고리 필터');
      console.log(filtered);

      console.log(filterDate);
      console.log(filterLocation);
      console.log(filterRating);
      console.log(filterCategory);
      console.log(filtered);

      setFilteredArr(filtered);
    }
  };

  const searchList = () => {
    let arr = filteredArr;
    let today = new Date();

    if (arr !== undefined) {
      if (radioFilter === 'operational') {
        arr = arr.filter(elem => elem.isEnd === false);
      } else {
        arr = arr.filter(
          elem =>
            getDateDifference(
              `${elem.startDate.year}${elem.startDate.month}${elem.startDate.day}`,
              `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`,
            ) >= 0,
        );
      }

      switch (listOrder) {
        // 조회수순은 보류
        case 'scraps':
          arr.sort((a, b) => b.scrapCount - a.scrapCount);
          break;
        case 'rating':
          arr.sort((a, b) => b.rating - a.rating);
          break;
        case 'opening':
          arr.sort(
            (a, b) =>
              getDateDifference(
                `${a.startDate.year}${a.startDate.month}${a.startDate.day}`,
                `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`,
              ) -
              getDateDifference(
                `${b.startDate.year}${b.startDate.month}${b.startDate.day}`,
                `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`,
              ),
          );
          break;
        case 'closing':
          arr.sort(
            (a, b) =>
              getDateDifference(
                `${a.endDate.year}${a.endDate.month}${a.endDate.day}`,
                `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`,
              ) -
              getDateDifference(
                `${b.endDate.year}${b.endDate.month}${b.endDate.day}`,
                `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`,
              ),
          );
          break;
      }
      // 그 외 필터 아래로 추가
    }

    return arr;
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div>
        <InputHeader onSearch={keyword => setKeyword(keyword)} defaultText={keyword} />
      </div>
      <div className="flex gap-8 px-16 mt-8">
        <div>
          <FilterIconButton variant="inactive" onClick={() => setFilterBottomSheetOpen(true)} />
        </div>
        <div className="flex gap-4">
          <div>
            <DropdownButton value="날짜" />
          </div>
          <div>
            <DropdownButton value="위치" />
          </div>
          <div>
            <DropdownButton value="평점" />
          </div>
          <div>
            <DropdownButton value="카테고리" />
          </div>
        </div>
      </div>
      <div className="flex justify-between px-16 mt-12 mb-16">
        <div className="flex flex-1 w-full">
          <RadioGroup defaultValue={radioFilter} onValueChange={value => setRadioFilter(value)}>
            <RadioGroupItem size="sm" value="operational" label="영업중" />
            <RadioGroupItem size="sm" value="planned" label="오픈예정" />
          </RadioGroup>
        </div>
        <div className="flex items-center gap-4 text-gray-500 text-b2" onClick={() => setIsBottomSheetOpen(true)}>
          <Sort />
          조회순
        </div>
      </div>
      <div className="overflow-y-auto">
        {results[0].isLoading ? (
          <div className="grid grid-cols-2 px-16 gap-y-32 gap-x-8">
            {Array.from({ length: 8 }, (_, idx) => (
              <ItemCardSkeleton key={`SKEL_${idx}`} variant="imageFull" />
            ))}
          </div>
        ) : results[0].data?.length! > 0 ? (
          <div className="grid grid-cols-2 px-16 gap-y-32 gap-x-8 pb-bottomMargin">
            {searchList().map((item, idx) => (
              <div key={`ITEMCARD_${idx}`} className="flex">
                <ItemCard
                  id={item.id}
                  variant="gallery"
                  img={item.thumbnailUrl ? item.thumbnailUrl : 'https://placehold.co/500/webp'}
                  location={item.location}
                  title={item.name}
                  day={`${formatToMD({ year: item.startDate.year, month: item.startDate.month, day: item.startDate.day })} - ${formatToMD({ year: item.endDate.year, month: item.endDate.month, day: item.endDate.day })}`}
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
        ) : (
          <div>
            <div className="flex flex-col items-center justify-center h-196">
              <div className="text-gray-900 text-b1">검색 결과가 없습니다.</div>
              <div className="mt-8 text-center text-gray-400 text-b3">
                다른 검색어를 입력하시거나 <br />
                철자와 띄어쓰기가 정확한지 확인해보세요.
              </div>
            </div>
            <hr className="border-4 border-gray-50" />
            <div className="px-16 mt-20">
              <div className="text-gray-900 text-h3">앗! 찾으시는 팝업이 없다면</div>
              <div className="text-gray-400 text-b3">이런 팝업은 어떠세요?</div>
            </div>
            <div className="grid grid-cols-2 px-16 gap-y-32 gap-x-8">
              {results[1].isLoading
                ? Array.from({ length: 8 }, (_, idx) => <ItemCardSkeleton key={`SKEL_${idx}`} variant="imageFull" />)
                : results[1].data?.map((item, idx) => (
                    <div key={`ITEMCARD_${idx}`} className="flex">
                      <ItemCard
                        id={item.id}
                        variant="gallery"
                        img={item.thumbnailUrl ? item.thumbnailUrl : 'https://placehold.co/500/webp'}
                        location={item.location}
                        title={item.name}
                        day={`${formatToMD({ year: item.startDate.year, month: item.startDate.month, day: item.startDate.day })} - ${formatToMD({ year: item.endDate.year, month: item.endDate.month, day: item.endDate.day })}`}
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
        )}
      </div>
      <BottomSheet open={isBottomSheetOpen} onOpenChange={setIsBottomSheetOpen}>
        <BottomSheetContent aria-describedby="bottomSheetContent" className="px-0">
          <BottomSheetHeader className="py-16 border-b border-gray-100">
            <BottomSheetTitle>정렬</BottomSheetTitle>
          </BottomSheetHeader>
          <RadioGroup
            className="flex-col w-full px-16 gap-y-0"
            defaultValue={listOrder}
            onValueChange={value => setListOrder(value)}>
            <div className="flex py-14">
              <RadioGroupItem size="lg" value="scraps" label="저장 많은 순" />
            </div>
            <div className="flex py-14">
              <RadioGroupItem size="lg" value="rating" label="평점순" />
            </div>
            <div className="flex py-14">
              <RadioGroupItem size="lg" value="opening" label="오픈일순" />
            </div>
            <div className="flex py-14">
              <RadioGroupItem size="lg" value="closing" label="종료일순" />
            </div>
          </RadioGroup>
        </BottomSheetContent>
      </BottomSheet>
      <BottomSheet open={filterBottomSheetOpen} onOpenChange={setFilterBottomSheetOpen}>
        <BottomSheetContent aria-describedby="bottomSheetContent" className="px-0">
          {/* <BottomSheetHeader className="py-16 border-b border-gray-100">
            <BottomSheetTitle>정렬</BottomSheetTitle>
          </BottomSheetHeader> */}
          <Tabs defaultValue="date" className="relative w-full">
            <TabsList className="flex justify-start gap-16 px-16 pt-8 pb-0 mt-14">
              <TabsTrigger value="date" className="pb-12 w-fit">
                날짜
              </TabsTrigger>
              <TabsTrigger value="location" className="pb-12 w-fit">
                위치
              </TabsTrigger>
              <TabsTrigger value="rate" className="pb-12 w-fit">
                평점
              </TabsTrigger>
              <TabsTrigger value="category" className="pb-12 w-fit">
                카테고리
              </TabsTrigger>
            </TabsList>
            <TabsContent value="date" className="min-h-[400px]">
              <div>
                <div className="px-24 pt-24">
                  <DatePicker
                    selectedDate={filterDate}
                    onDateChange={date => {
                      if (date) setFilterDate(date);
                    }}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="location" className="min-h-[400px]">
              <div className="px-16 pt-16">
                <ChoiceChipGroup className="grid grid-cols-6 grid-rows-3 gap-8 justify-items-center">
                  {locations.map((item, idx) => (
                    <ToggleChipItem
                      key={`CAT_${idx}`}
                      isSelected={filterLocation.includes(item)}
                      value={item}
                      text={item}
                      onChange={(value, selected) => {
                        if (selected) {
                          // 선택 시 배열에 카테고리 추가
                          setFilterLocation(prev => [...prev, value]);
                        } else {
                          // 선택 해제 시 배열에서 카테고리 제거
                          setFilterLocation(filterLocation.filter(elem => elem !== value));
                        }
                      }}
                    />
                  ))}
                </ChoiceChipGroup>
              </div>
            </TabsContent>
            <TabsContent value="rate" className="min-h-[400px]">
              <div className="px-16 pt-8">
                <RadioGroup className="flex flex-col" onValueChange={value => setFilterRating(value)}>
                  <div className="py-14">
                    <RadioGroupItem size="lg" value="all" label="전체" />
                  </div>
                  <div className="py-14">
                    <RadioGroupItem size="lg" value="4" label="4점 이상" />
                  </div>
                  <div className="py-14">
                    <RadioGroupItem size="lg" value="3" label="3점 이상" />
                  </div>
                  <div className="py-14">
                    <RadioGroupItem size="lg" value="2" label="2점 이상" />
                  </div>
                  <div className="py-14">
                    <RadioGroupItem size="lg" value="1" label="1점 이상" />
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>
            <TabsContent value="category" className="min-h-[400px]">
              <ToggleChipGroup className="flex flex-wrap w-full gap-8 px-16 pt-16 h-fit">
                {categories.map((item, idx) => (
                  <ToggleChipItem
                    key={`CAT_${idx}`}
                    isSelected={filterCategory.includes(item)}
                    value={item}
                    text={item}
                    onChange={(value, selected) => {
                      if (selected) {
                        // 선택 시 배열에 카테고리 추가
                        setFilterCategory(prev => [...prev, value]);
                      } else {
                        // 선택 해제 시 배열에서 카테고리 제거
                        setFilterCategory(filterCategory.filter(elem => elem !== value));
                      }
                    }}
                  />
                ))}
              </ToggleChipGroup>
            </TabsContent>
          </Tabs>
          <BottomSheetFooter>
            <div className="flex gap-8 px-16 py-8">
              <div>
                <SecondaryButton onClick={initializeFilter}>초기화</SecondaryButton>
              </div>
              <div className="flex-1">
                <PrimaryButton
                  variant="enabled"
                  onClick={() => {
                    setFilterBottomSheetOpen(false);
                    setFilters();
                  }}>
                  필터 적용하기
                </PrimaryButton>
              </div>
            </div>
          </BottomSheetFooter>
        </BottomSheetContent>
      </BottomSheet>
    </div>
  );
};

export default Page;
