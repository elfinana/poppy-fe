'use client';
import { BottomSheet, BottomSheetContent, BottomSheetTitle, RadioGroupItem, RadioGroup } from '@/src/shared';

type sortSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SortSheet = ({ isOpen, onClose }: sortSheetProps) => {
  return (
    <BottomSheet open={isOpen} onOpenChange={onClose}>
      <BottomSheetContent className="px-16">
        <BottomSheetTitle></BottomSheetTitle>
        <div className="flex flex-col items-center justify-center w-full h-full pt-[26px]">
          <span className="text-h3">정렬</span>
          <hr className="w-full mt-16 border-t border-gray-100" />
        </div>
        <RadioGroup className="flex-col w-full px-16 pt-[22px]">
          <div className="flex ">
            <RadioGroupItem size="lg" value="views" label="최근 등록순" />
          </div>
          <div className="flex pt-14">
            <RadioGroupItem size="lg" value="reviews" label="좋아요 많은순" />
          </div>
          <div className="flex pt-14">
            <RadioGroupItem size="lg" value="opening" label="별점 높은순" />
          </div>
          <div className="flex pb-14 pt-14">
            <RadioGroupItem size="lg" value="closing" label="별점 낮은순" />
          </div>
        </RadioGroup>
      </BottomSheetContent>
    </BottomSheet>
  );
};
