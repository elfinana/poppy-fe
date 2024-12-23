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
  Hr,
  ItemCard,
  PrimaryButton,
  RadioGroup,
  RadioGroupItem,
  SecondaryButton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/shared';
import { BottomSheetTitle } from '@/src/shared/ui/bottomsheet/bottomsheet';
import { InputHeader, ItemCardData } from '@/src/widgets';
import React from 'react';

const Page = ({ params }: { params: { keyword: string } }) => {
  const [keyword, setKeyword] = React.useState(decodeURIComponent(params.keyword));
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);
  const [filterBottomSheetOpen, setFilterBottomSheetOpen] = React.useState(false);

  React.useEffect(() => {
    // 팝업스토어 검색 API 통신 처리
    console.log('팝업스토어 검색 API 통신 처리');
  }, [keyword]);

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

  return (
    <div className="h-full flex flex-col w-full">
      <div>
        <InputHeader onSearch={keyword => setKeyword(keyword)} defaultText={keyword} />
      </div>
      <div className="flex px-16 mt-8 gap-8">
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
          <RadioGroup defaultValue="operational">
            <RadioGroupItem size="sm" value="operational" label="영업중" />
            <RadioGroupItem size="sm" value="planned" label="오픈예정" />
          </RadioGroup>
        </div>
        <div className="flex items-center gap-4 text-b2 text-gray-500" onClick={() => setIsBottomSheetOpen(true)}>
          <Sort />
          조회순
        </div>
      </div>
      <div className="overflow-y-auto">
        {recommandData.length > 0 ? (
          <div className="grid grid-cols-2 gap-y-32 gap-x-8 px-16">
            {recommandData.map((item, idx) => (
              <div key={`ITEMCARD_${idx}`} className="flex">
                <ItemCard
                  id={item.id}
                  variant="gallery"
                  img={item.img}
                  location={item.location}
                  title={item.title}
                  day={item.day}
                  deadLine={item.deadLine}
                  rank={idx + 1}
                  isCount={item.isCount}
                  ml={false}
                  mr={false}
                  imageFull
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex flex-col justify-center items-center h-196">
              <div className="text-b1 text-gray-900">검색 결과가 없습니다.</div>
              <div className="text-b3 text-gray-400 text-center mt-8">
                다른 검색어를 입력하시거나 <br />
                철자와 띄어쓰기가 정확한지 확인해보세요.
              </div>
            </div>
            <hr className="border-4 border-gray-50" />
            <div className="px-16 mt-20">
              <div className="text-h3 text-gray-900">앗! 찾으시는 팝업이 없다면</div>
              <div className="text-b3 text-gray-400">이런 팝업은 어떠세요?</div>
            </div>
            <div className="grid grid-cols-2 gap-y-32 gap-x-8 px-16">
              {popularData.map((item, idx) => (
                <div key={`ITEMCARD_${idx}`} className="flex">
                  <ItemCard
                    id={item.id}
                    variant="gallery"
                    img={item.img}
                    location={item.location}
                    title={item.title}
                    day={item.day}
                    deadLine={item.deadLine}
                    rank={idx + 1}
                    isCount={item.isCount}
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
          <BottomSheetHeader className="border-b border-gray-100 py-16">
            <BottomSheetTitle>정렬</BottomSheetTitle>
          </BottomSheetHeader>
          <RadioGroup className="flex-col w-full px-16 gap-y-0">
            <div className="flex  py-14">
              <RadioGroupItem size="lg" value="views" label="조회순" />
            </div>
            <div className="flex py-14">
              <RadioGroupItem size="lg" value="reviews" label="리뷰 많은 순" />
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
          {/* <BottomSheetHeader className="border-b border-gray-100 py-16">
            <BottomSheetTitle>정렬</BottomSheetTitle>
          </BottomSheetHeader> */}
          <Tabs defaultValue="date" className="relative w-full">
            <TabsList className="flex justify-start px-16 pt-8 pb-0 mt-14 gap-16">
              <TabsTrigger value="date" className="w-fit pb-12">
                날짜
              </TabsTrigger>
              <TabsTrigger value="location" className="w-fit pb-12">
                위치
              </TabsTrigger>
              <TabsTrigger value="rate" className="w-fit pb-12">
                평점
              </TabsTrigger>
              <TabsTrigger value="category" className="w-fit pb-12">
                카테고리
              </TabsTrigger>
            </TabsList>
            <TabsContent value="date">
              <div>
                <div className="px-24 pt-24">
                  <DatePicker />
                </div>
                <div className="flex gap-8 px-16 py-8">
                  <div>
                    <SecondaryButton>초기화</SecondaryButton>
                  </div>
                  <div className="flex-1">
                    <PrimaryButton variant="enabled">필터 적용하기</PrimaryButton>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="location">
              <div className="px-16 pt-16">
                <ChoiceChipGroup className="grid grid-cols-6 grid-rows-3 gap-8 justify-items-center">
                  {locations.map(location => (
                    <ChoiceChipGroupItem key={location} value={location}>
                      {location}
                    </ChoiceChipGroupItem>
                  ))}
                </ChoiceChipGroup>
              </div>
            </TabsContent>
            <TabsContent value="rate">평점</TabsContent>
            <TabsContent value="category">카테고리</TabsContent>
          </Tabs>
        </BottomSheetContent>
      </BottomSheet>
    </div>
  );
};

export default Page;

const recommandData: Array<ItemCardData> = [
  {
    id: 1,
    img: 'https://placehold.co/500/webp',
    location: '서울 영등포구',
    title: '골든볼 팝업스토어',
    day: '05.21(금) - 12.31(일)',
    deadLine: 40,
    isCount: true,
  },
  {
    id: 2,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: false,
  },
  {
    id: 3,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: true,
  },
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
  },
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
  },
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
  },
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
  },
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
  },
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
  },
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
  },
];

const popularData: Array<ItemCardData> = [
  {
    id: 1,
    img: 'https://placehold.co/500/webp',
    location: '서울 영등포구',
    title: '골든볼 팝업스토어',
    day: '05.21(금) - 12.31(일)',
    deadLine: 40,
    isCount: true,
  },
  {
    id: 2,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: false,
  },
  {
    id: 3,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: true,
  },
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
  },
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
  },
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
  },
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
  },
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
  },
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
  },
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
  },
];
