'use client';
import React, { useEffect, useState } from 'react';
import {
  BottomSheet,
  BottomSheetContent,
  IconButton,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  RadioGroup,
  RadioGroupItem,
  SecondaryButton,
  BottomSheetHeader,
  BottomSheetDescription,
  Skeleton,
  StatusLabel,
} from '@/src/shared';
import { ImageSlider } from '@/src/widgets/slider/ui/ImageSlider';
import { Sort } from '@/public';
import { formatDay } from '../../lib/dateUtils';
import Image from 'next/image';
import FilterSheet from './filterSheet';
import { useRouter } from 'next/navigation';
import { BottomSheetTitle } from './bottomsheet';
import { ImageSliderSkeleton } from '../skeletons/ImageSliderSkeleton';
import { storeData } from '@/src/views/book/const';
import { operations } from '../../lib/operations';

type FilterStoreSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any[];
  onResetFilter: () => void;
};

const FilterStoreSheet = ({ isOpen, onClose, data, onResetFilter }: FilterStoreSheetProps) => {
  const [selectedOption, setSelectedOption] = useState('조회 순');
  const [sortedData, setSortedData] = useState(data);
  const [activeTab, setActiveTab] = React.useState<string>('c');
  const [testOpen, setTestOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sort = ['조회 순', '리뷰 많은 순', '오픈일순', '종료일순'];

  const handleSort = () => {
    let sorted = [...data];
    switch (selectedOption) {
      case '조회 순':
        sorted.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case '리뷰 많은 순':
        sorted.sort((a, b) => b.scrapCount - a.scrapCount);
        break;
      case '오픈일순':
        sorted.sort((a, b) => {
          const dateA = new Date(a.startDate.year, a.startDate.month - 1, a.startDate.day);
          const dateB = new Date(b.startDate.year, b.startDate.month - 1, b.startDate.day);
          return dateA.getTime() - dateB.getTime();
        });
        break;
      case '종료일순':
        sorted.sort((a, b) => {
          const dateA = new Date(a.endDate.year, a.endDate.month - 1, a.endDate.day);
          const dateB = new Date(b.endDate.year, b.endDate.month - 1, b.endDate.day);
          return dateA.getTime() - dateB.getTime();
        });
        break;
      default:
    }
    setSortedData(sorted);
  };

  useEffect(() => {
    if (!data || data.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setSortedData(data);
    }
  }, [data]);

  const router = useRouter();

  const handleItemClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  const handleApplyFilter = (filters: {
    date: Date | null;
    location: string[];
    rating: string;
    category: string[];
  }) => {};
  useEffect(() => {
    setSortedData(data);
  }, [data]);

  return (
    <>
      <BottomSheet open={isOpen} onOpenChange={onClose}>
        <BottomSheetContent dimmed={false}>
          <BottomSheetHeader className="invisible">
            <BottomSheetDescription className="invisible" />
            <BottomSheetTitle className="invisible" />
          </BottomSheetHeader>

          <div className="flex flex-col items-center justify-center w-full h-full pt-28">
            <span className="text-h3">팝업스토어 목록</span>
            <hr className="w-full mt-16 border-t border-gray-100" />
          </div>

          {isLoading ? (
            <div className="max-h-[380px] mx-16 overflow-y-auto">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="mt-32">
                  <ImageSliderSkeleton count={3} height="168px" width="144px" />
                  <Skeleton className="w-1/2 h-6 mt-4 rounded-md" />
                  <Skeleton className="w-1/3 h-6 mt-4 rounded-md" />
                </div>
              ))}
            </div>
          ) : sortedData && sortedData.length > 0 ? (
            <>
              <div className="flex items-center justify-end py-12 text-gray-500 text-b2">
                <AlertDialog>
                  <AlertDialogTrigger variant="enabled" asChild>
                    <button className="flex items-center gap-4 mr-16">
                      <Sort />
                      {selectedOption}
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>정렬 기준</AlertDialogTitle>
                      <AlertDialogDescription>
                        <div className="flex flex-col mt-8 ml-20">
                          <RadioGroup
                            className="flex flex-col"
                            value={selectedOption}
                            onValueChange={value => setSelectedOption(value)}>
                            {sort.map((sortOption, index) => (
                              <div key={index} className="flex items-center">
                                <RadioGroupItem
                                  size="lg"
                                  value={sortOption}
                                  label={sortOption}
                                  checked={selectedOption === sortOption}
                                  onChange={() => setSelectedOption(sortOption)}
                                />
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction variant="informative" onClick={handleSort}>
                        확인
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className="max-h-[380px] mx-16 overflow-y-auto">
                {sortedData.map((store, index) => {
                  const status = operations(
                    { hour: store.openingTime?.hour ?? 0, minute: store.openingTime?.minute ?? 0 },
                    { hour: store.closingTime?.hour ?? 0, minute: store.closingTime?.minute ?? 0 },
                  );

                  return (
                    <div key={index} className={index > 0 ? 'mt-32' : ''} onClick={() => handleItemClick(store.id)}>
                      <ImageSlider images={store.imageUrls} />
                      <div className="flex flex-row items-center justify-between pt-8">
                        <span className="text-h2">{store.name}</span>
                        <StatusLabel status={status} />
                      </div>
                      <span className="text-gray-500 text-b3_com">
                        {`${formatDay({
                          year: store.startDate.year,
                          month: store.startDate.month,
                          day: store.startDate.day,
                        })} ~ ${formatDay({
                          year: store.endDate.year,
                          month: store.endDate.month,
                          day: store.endDate.day,
                        })}`}
                      </span>
                      <div className="flex items-center mt-4">
                        <IconButton icon={'ic-star-active'} size={'smmd'} />
                        <span className="ml-2 text-gray-900 text-b2">{store.rating}</span>
                        <span className="ml-8 text-gray-400 text-b3">· 방문자 리뷰 {store.reviewCnt}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center mt-32 h-[380px]">
              <Image src="/empty/emptystore.webp" alt="Empty Store" width={200} height={200} />
              <span className="text-gray-900 text-b1">조건에 맞는 스토어가 없어요.</span>
              <span className="mt-4 text-gray-500 text-b3">필터를 변경하거나 초기화해 보세요.</span>
              <SecondaryButton size="sm" className="mt-[40px]" onClick={onResetFilter}>
                필터 초기화하기
              </SecondaryButton>
              <FilterSheet
                isOpen={testOpen}
                onClose={() => setTestOpen(false)}
                activeTab={activeTab}
                onApplyFilter={handleApplyFilter}
                onResetFilter={onResetFilter}
              />
            </div>
          )}
        </BottomSheetContent>
      </BottomSheet>
    </>
  );
};

export default FilterStoreSheet;
