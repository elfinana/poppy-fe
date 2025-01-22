'use client';
import React, { useEffect, useState } from 'react';
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  IconButton,
  BottomSheetDescription,
  BottomSheetTitle,
  Skeleton,
  StatusLabel,
} from '@/src/shared';
import { ImageSlider } from '@/src/widgets/slider/ui/ImageSlider';
import { formatDay } from '../../lib/dateUtils';
import { ImageSliderSkeleton } from '../skeletons/ImageSliderSkeleton';
import { operations } from '../../lib/operations';
import { useRouter } from 'next/navigation';

type MarkerInfoSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  markerData: any;
};

const MarkerInfoSheet = ({ isOpen, onClose, markerData }: MarkerInfoSheetProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (markerData) {
      setIsLoading(false);
    }
  }, [markerData]);

  const status = operations(
    { hour: markerData.openingTime?.hour ?? 0, minute: markerData.openingTime?.minute ?? 0 },
    { hour: markerData.closingTime?.hour ?? 0, minute: markerData.closingTime?.minute ?? 0 },
  );
  const router = useRouter();

  const handleItemClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  if (isLoading) {
    return (
      <BottomSheet open={isOpen} onOpenChange={onClose}>
        <BottomSheetContent className="px-16" dimmed={false}>
          <Skeleton className="w-2/3 h-8 mt-[32px]" />
          <Skeleton className="w-[64px] h-[24px] mt-4 rounded-[20px]" />
          <Skeleton className="w-1/2 h-4 mt-4" />
          <div className="flex items-center mt-4 mb-8">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="w-16 h-4 ml-2" />
            <Skeleton className="w-32 h-4 ml-8" />
          </div>
          <div className="mb-[14px]">
            <ImageSliderSkeleton count={3} height="168px" width="144px" />
          </div>
        </BottomSheetContent>
      </BottomSheet>
    );
  }
  return (
    <BottomSheet open={isOpen} onOpenChange={onClose}>
      <BottomSheetContent className="px-16" dimmed={false}>
        <BottomSheetHeader className="invisible">
          <BottomSheetDescription className="invisible" />
          <BottomSheetTitle className="invisible" />
        </BottomSheetHeader>
        <div onClick={() => handleItemClick(markerData.id)}>
          <div className="flex flex-row justify-between items-center mt-[32px]">
            <span className="text-h2">{markerData.name}</span>
            <StatusLabel status={status} />
          </div>

          <span className="text-gray-500 text-b3_com">
            {`
             ${formatDay({
               year: markerData.startDate.year,
               month: markerData.startDate.month,
               day: markerData.startDate.day,
             })}
          ~
          ${formatDay({
            year: markerData.endDate.year,
            month: markerData.endDate.month,
            day: markerData.endDate.day,
          })}
          `}
          </span>
          <div className="flex items-center mt-4 mb-8">
            <IconButton icon={'ic-star-active'} size={'smmd'} />
            <span className="ml-2 text-gray-900 text-b2">{markerData.rating}</span>
            <span className="ml-8 text-gray-400 text-b5">방문자 리뷰 {markerData.reviewCnt}</span>
          </div>

          <div className="mb-[14px]">
            <ImageSlider images={markerData.imageUrls} />
          </div>
        </div>
      </BottomSheetContent>
    </BottomSheet>
  );
};

export default MarkerInfoSheet;
