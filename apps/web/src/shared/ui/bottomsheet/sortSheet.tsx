'use client';
import { fetchReviews } from '@/src/widgets/detail/api/reviewApi';
import { BottomSheet, BottomSheetContent, BottomSheetTitle, RadioGroupItem, RadioGroup } from '@/src/shared';
import { useState } from 'react';
import { useQuery } from 'react-query';

type sortSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  sortType: string;
  onSortChange: (value: string) => void;
};

export const SortSheet = ({ isOpen, onClose, sortType, onSortChange }: sortSheetProps) => {
  return (
    <BottomSheet open={isOpen} onOpenChange={onClose}>
      <BottomSheetContent className="px-16">
        <BottomSheetTitle></BottomSheetTitle>
        <div className="flex flex-col items-center justify-center w-full h-full pt-[26px]">
          <span className="text-h3">정렬</span>
          <hr className="w-full mt-16 border-t border-gray-100" />
        </div>
        <RadioGroup className="flex-col w-full px-16 pt-[22px]" onValueChange={onSortChange} value={sortType}>
          <div className="flex ">
            <RadioGroupItem size="lg" value="RECENT" label="최근 등록순" />
          </div>
          <div className="flex pt-14">
            <RadioGroupItem size="lg" value="LIKES" label="좋아요 많은순" />
          </div>
          <div className="flex pt-14">
            <RadioGroupItem size="lg" value="RATING_HIGH" label="별점 높은순" />
          </div>
          <div className="flex pb-14 pt-14">
            <RadioGroupItem size="lg" value="RATING_LOW" label="별점 낮은순" />
          </div>
        </RadioGroup>
      </BottomSheetContent>
    </BottomSheet>
  );
};
