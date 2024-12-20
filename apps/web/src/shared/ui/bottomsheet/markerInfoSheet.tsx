'use client';
import React from 'react';
import { BottomSheet, BottomSheetContent, BottomSheetHeader, IconButton } from '@/src/shared';
import { ItemCardData, PopupSlider } from '@/src/widgets';

type MarkerInfoSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  markerData: {
    title: string;
    date: string;
    description: string;
  };
};

const MarkerInfoSheet = ({ isOpen, onClose, markerData }: MarkerInfoSheetProps) => {
  return (
    <BottomSheet open={isOpen} onOpenChange={onClose}>
      <BottomSheetContent className="px-16 ">
        <div className="flex flex-row justify-between items-center mt-[32px]">
          <span className="text-h2">{markerData.title}</span>
          <div className="flex gap-x-[4px] h-[24px] items-center">
            <IconButton icon={'ic-info-time'} size={'sm'} />
            <p className="text-[#5599FF] text-c1">영업 중</p>
          </div>
        </div>
        <span className="text-b3_com">24.11.22(금) - 24.12.04(수)</span>
        <div className="flex flex-row items-center">
          <IconButton className={`ml-[2px]`} icon={'ic-star-active'} size={'smmd'} />
          <span className="text-b2">4.5</span>
          <span className="text-b5">방문자 리뷰 19 · 인스타 리뷰 7</span>
        </div>
      </BottomSheetContent>
    </BottomSheet>
  );
};

export default MarkerInfoSheet;
