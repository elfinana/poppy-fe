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
  DatePicker,
  RadioGroup,
  RadioGroupItem,
  SecondaryButton,
  PrimaryButton,
  ToggleChipGroup,
  ToggleChipItem,
  BottomSheetTitle,
  BottomSheetDescription,
} from '@/src/shared';

import FilterStoreSheet from './filterStoreSheet';
import { FilterParams } from '@/app/search/model/searchData';
import { fetchFilteredPopupStores } from '@/src/widgets/search/api/filterSearchApi';

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

const categoryMap: Record<string, number> = {
  '패션 · 뷰티': 1,
  음식: 2,
  아트: 3,
  굿즈: 4,
  라이프: 5,
};
interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  filters?: { date: Date | null; location: string[]; rating: string; category: string[] }; // ���기 필터 상태
  onApplyFilter: (filters: { date: Date | null; location: string[]; rating: string; category: string[] }) => void;
  onResetFilter: () => void;
}

const FilterSheet = ({ isOpen, onClose, activeTab, filters, onApplyFilter, onResetFilter }: FilterSheetProps) => {
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined);
  const [isStoreSheetOpen, setIsStoreSheetOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(isOpen);

  const [filterState, setFilterState] = React.useState<{
    date: Date | null;
    location: string[];
    rating: string;
    category: string[];
  }>({
    date: null,
    location: ['전체'],
    rating: '전체',
    category: ['전체'],
  });

  React.useEffect(() => {
    setFilterState(filters || { date: null, location: ['전체'], rating: '전체', category: ['전체'] });
  }, [filters]);

  const updateFilterState = (key: string, value: any) => {
    setFilterState(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = async () => {
    try {
      // 필터 파라미터 구성
      const params: FilterParams = {
        date: filterState.date ? filterState.date.toISOString().split('T')[0] : null,
        locations: filterState.location.includes('전체') ? null : filterState.location,
        rating: filterState.rating === '전체' ? null : parseInt(filterState.rating),
        categoryIds: filterState.category.includes('전체') ? null : filterState.category.map(cat => categoryMap[cat]),
      };

      onApplyFilter({
        date: filterState.date,
        location: filterState.location,
        rating: filterState.rating,
        category: filterState.category,
      });

      const data = await fetchFilteredPopupStores(params);

      setFilteredData(data);
      setIsStoreSheetOpen(true);
    } catch (error) {
      console.error('Failed to fetch filtered data:', error);
    } finally {
      onClose();
    }
  };

  const handleReset = () => {
    setFilterState({
      date: null,
      location: ['전체'],
      rating: '전체',
      category: ['전체'],
    }); // 로컬 상태 초기화
    onResetFilter(); // 상위 컴포넌트에도 초기화 알림
  };

  return (
    <>
      <BottomSheet open={isOpen} onOpenChange={onClose}>
        <BottomSheetContent>
          <Tabs defaultValue={activeTab} className="w-full mt-24">
            <BottomSheetHeader className="invisible">
              <BottomSheetDescription className="invisible" />
              <BottomSheetTitle className="invisible" />
            </BottomSheetHeader>

            <TabsList className="flex justify-start gap-x-12">
              {tabsB.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value} className="w-fit">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabsB.map(tab => (
              <TabsContent key={tab.value + JSON.stringify(filterState)} value={tab.value} className="min-h-[350px]">
                {tab.value === 'c' && (
                  <div className="px-[16px] mt-16">
                    <DatePicker
                      selectedDate={filterState.date || undefined}
                      onDateChange={(date: Date | undefined) => {
                        updateFilterState('date', date || null);
                      }}
                    />
                  </div>
                )}
                {tab.value === 'd' && (
                  <div className="px-[16px] mt-16">
                    <ToggleChipGroup className="flex flex-wrap gap-8">
                      {locations.map(location => (
                        <ToggleChipItem
                          key={location}
                          variant={filterState.location.includes(location) ? 'enabled' : 'disabled'}
                          isSelected={filterState.location.includes(location)}
                          value={location}
                          text={location}
                          onChange={(value, isSelected) => {
                            if (value === '전체') {
                              if (isSelected) {
                                updateFilterState('location', ['전체']);
                              } else {
                                updateFilterState(
                                  'location',
                                  filterState.location.filter(item => item !== value),
                                );
                              }
                            } else {
                              const updatedLocation = isSelected
                                ? [...filterState.location.filter(item => item !== '전체'), value] // "전체" 제거하고 선택된 항목 추가
                                : filterState.location.filter(item => item !== value); // 선택된 항목 제거

                              updateFilterState('location', updatedLocation);
                            }
                          }}
                        />
                      ))}
                    </ToggleChipGroup>
                  </div>
                )}
                {tab.value === 'e' && (
                  <div className="px-[16px] mt-16">
                    <RadioGroup
                      className="flex flex-col"
                      value={filterState.rating}
                      onValueChange={(value: string) => updateFilterState('rating', value)}>
                      {ratings.map((rating, index) => (
                        <div key={index} className="flex items-center  mb-[28px]">
                          <RadioGroupItem
                            key={index}
                            value={rating}
                            size="lg"
                            label={rating}
                            onChange={value => {
                              updateFilterState('rating', value);
                            }}
                          />
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}
                {tab.value === 'f' && (
                  <div className="px-[16px] mt-16">
                    <ToggleChipGroup className="flex flex-wrap gap-8">
                      {category.map(cat => (
                        <ToggleChipItem
                          key={cat}
                          variant={filterState.category.includes(cat) ? 'enabled' : 'disabled'}
                          isSelected={filterState.category.includes(cat)}
                          value={cat}
                          text={cat}
                          onChange={(value, isSelected) => {
                            if (value === '전체') {
                              if (isSelected) {
                                updateFilterState('category', ['전체']);
                              } else {
                                updateFilterState(
                                  'category',
                                  filterState.category.filter(item => item !== value),
                                );
                              }
                            } else {
                              const updatedCategory = isSelected
                                ? [...filterState.category.filter(item => item !== '전체'), value]
                                : filterState.category.filter(item => item !== value);

                              updateFilterState('category', updatedCategory);
                            }
                          }}
                        />
                      ))}
                    </ToggleChipGroup>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
          <div className="flex flex-row gap-8 px-16 mb-8">
            <SecondaryButton className="flex-[1]" onClick={handleReset}>
              초기화
            </SecondaryButton>
            <PrimaryButton className="flex-[2.5]" variant="enabled" onClick={applyFilters}>
              필터 적용하기
            </PrimaryButton>
          </div>
        </BottomSheetContent>
      </BottomSheet>

      <FilterStoreSheet
        isOpen={isStoreSheetOpen}
        onClose={() => setIsStoreSheetOpen(false)}
        data={filteredData}
        onResetFilter={onResetFilter}
      />
    </>
  );
};

export default FilterSheet;
