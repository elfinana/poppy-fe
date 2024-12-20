'use client';
import React, { useState } from 'react';
import {
  BottomSheet,
  BottomSheetHeader,
  BottomSheetContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  ChoiceChipGroup,
  ChoiceChipGroupItem,
  DatePicker,
  RadioGroup,
  RadioGroupItem,
  SecondaryButton,
  PrimaryButton,
  FilterChipGroupItem,
} from '@/src/shared';

const tabsB = [
  { value: 'c', label: '날짜' },
  { value: 'd', label: '위치' },
  { value: 'e', label: '평점' },
  { value: 'f', label: '카테고리' },
];

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

const category = ['전체', '패션 · 뷰티', '아트', '음식', '굿즈', '라이프'];
const ratings = ['전체', '4점 이상', '3점 이상', '2점 이상', '1점 이상'];

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
}

const FilterSheet = ({ isOpen, onClose, activeTab }: FilterSheetProps) => {
  const [filterState, setFilterState] = useState({
    date: null as Date | null,
    location: '전체',
    rating: '전체',
    category: '전체',
    // 추가적인 탭 상태를 여기에 추가
  });

  // 상태 업데이트 함수
  const updateFilterState = (key: string, value: any) => {
    setFilterState(prev => ({ ...prev, [key]: value }));
  };
  return (
    <BottomSheet open={isOpen} onOpenChange={onClose}>
      <BottomSheetContent>
        <Tabs defaultValue={activeTab} className="w-full mt-24">
          <BottomSheetHeader>
            <TabsList className="flex justify-start gap-x-12">
              {tabsB.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value} className="w-fit">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </BottomSheetHeader>
          {tabsB.map(tab => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.value === 'c' && (
                <div className="px-[16px] mt-16">
                  <DatePicker />
                </div>
              )}
              {tab.value === 'd' && (
                <div className="px-[16px] mt-16">
                  {/* <ChoiceChipGroup className="flex flex-wrap gap-8">
                    {locations.map(location => (
                      <ChoiceChipGroupItem key={location} value={location}>
                        {location}
                      </ChoiceChipGroupItem>
                    ))}
                  </ChoiceChipGroup> */}

                  {locations.map(location => (
                    <FilterChipGroupItem
                      key={location}
                      text="서울울"
                      variant="enabled" // 적절한 variant 값 설정
                      value={location} // location 값을 value로 전달
                    >
                      {location}
                    </FilterChipGroupItem>
                  ))}
                </div>
              )}
              {tab.value === 'e' && (
                <div className="px-[16px] mt-16">
                  <RadioGroup className="flex flex-col">
                    {ratings.map((rating, index) => (
                      <div key={index} className="flex  items-center gap-8 mb-[28px]">
                        <RadioGroupItem value={`rating-${index}`} size="lg" />
                        <span className="text-gray-800">{rating}</span>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              {tab.value === 'f' && (
                <div className="px-[16px] mt-16">
                  <ChoiceChipGroup className="flex flex-wrap gap-8">
                    {category.map(cat => (
                      <ChoiceChipGroupItem key={cat} value={cat}>
                        {cat}
                      </ChoiceChipGroupItem>
                    ))}
                  </ChoiceChipGroup>
                </div>
              )}
              <div className="flex flex-row gap-8 px-16 mb-8">
                <SecondaryButton>초기화</SecondaryButton>
                <PrimaryButton variant="enabled">개 결과보기</PrimaryButton>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </BottomSheetContent>
    </BottomSheet>
  );
};

export default FilterSheet;
