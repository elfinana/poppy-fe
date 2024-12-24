'use client';
import React from 'react';
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
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
} from '@/src/shared';
import { ImageSlider } from '@/src/widgets/slider/ui/ImageSlider';
import { Sort } from '@/public';

type FilterStoreSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any[];
};

const FilterStoreSheet = ({ isOpen, onClose, data }: FilterStoreSheetProps) => {
  const handleSortSelection = () => {
    console.log('응');
  };
  return (
    <BottomSheet open={isOpen} onOpenChange={onClose}>
      <BottomSheetContent>
        <div className="flex flex-col items-center w-full pt-28">
          <span className="text-h3">팝업스토어 목록</span>
          <hr className="w-full mt-16 border-t border-gray-100" />
        </div>
        <div className="flex items-center justify-end py-12 text-gray-500 text-b2">
          <AlertDialog>
            <AlertDialogTrigger variant="enabled" asChild>
              <button className="flex items-center gap-4">
                <Sort />
                조회순
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>정렬 기준</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="flex flex-col gap-4 px-6 py-4"></div>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                {/* <AlertDialogAction variant="informative" onClick={() => handleSortSelection('확인')}>
                  확인
                </AlertDialogAction> */}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-200px)]">
          {data.map((store, index) => (
            <>
              {/* <ImageSlider images={store.thumbnail} /> */}

              <div className="flex flex-row justify-between items-center mt-[32px]">
                <span className="text-h2">{store.name}</span>
                <div className="flex gap-x-[4px] h-[24px] w-[64px] bg-blue-100 rounded-[20px] items-center justify-center">
                  <IconButton icon={'ic-info-bluetime'} size={'sm'} />
                  <p className="text-[#5599FF] text-c1 font-medium">영업 중</p>
                </div>
              </div>

              <span className="text-gray-500 text-b3_com">
                {' '}
                {store.startDate} ~ {store.endDate}
              </span>
              <div className="flex flex-row items-center mt-4">
                <IconButton icon={'ic-star-active'} size={'smmd'} />
                <span className="text-gray-900 text-b2 ">{store.rating}</span>
                <span className="ml-8 text-gray-400 text-b5">방문자 리뷰 {store.scrapCount}</span>
              </div>
            </>
          ))}
        </div>
      </BottomSheetContent>
    </BottomSheet>
  );
};

export default FilterStoreSheet;
