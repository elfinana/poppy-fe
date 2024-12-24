'use client';
import React from 'react';
import { BottomSheet, BottomSheetContent, BottomSheetHeader, IconButton } from '@/src/shared';
import { ImageSlider } from '@/src/widgets/slider/ui/ImageSlider';

type MarkerInfoSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  markerData: {
    title: string;
    date: string;
    description: string;
    images: string[];
  };
};

const MarkerInfoSheet = ({ isOpen, onClose, markerData }: MarkerInfoSheetProps) => {
  return (
    <BottomSheet open={isOpen} onOpenChange={onClose}>
      <BottomSheetContent className="px-16 ">
        <div className="flex flex-row justify-between items-center mt-[32px]">
          <span className="text-h2">{markerData.title}</span>
          <div className="flex gap-x-[4px] h-[24px] w-[64px] bg-blue-100 rounded-[20px] items-center justify-center">
            <IconButton icon={'ic-info-bluetime'} size={'sm'} />
            <p className="text-[#5599FF] text-c1 font-medium">영업 중</p>
          </div>
        </div>
        <span className="text-b3_com text-gray-500">24.11.22(금) - 24.12.04(수)</span>
        <div className="flex flex-row items-center mt-4">
          <IconButton icon={'ic-star-active'} size={'smmd'} />
          <span className="text-b2 text-gray-900 ">4.5</span>
          <span className="text-b5 text-gray-400 ml-8">방문자 리뷰 19 · 인스타 리뷰 7</span>
        </div>

        <ImageSlider images={markerData.images} />
      </BottomSheetContent>
    </BottomSheet>
  );
};

export default MarkerInfoSheet;
