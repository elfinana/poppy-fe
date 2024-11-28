import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './sheet';
import { DatePicker } from './datePicker';
import { SheetLayout } from './SheetLayout';
import { Button } from './button';

type Props = {};

export const PlanSheet = (props: Props) => {
  return (
    <Sheet>
      <SheetTrigger>예약하기</SheetTrigger>
      <SheetContent side={'bottom'} className="rounded-t-3xl">
        <SheetLayout>
          <SheetHeader className="flex justify-center">
            <div className="mx-auto w-10 h-1 mt-2.5 mb-4 bg-gray-100 rounded-xl" />
            <SheetTitle>예약 정보</SheetTitle>
            <SheetDescription className="px-2 pt-6 pb-5">
              <DatePicker />
            </SheetDescription>
            <Button className="p-0 w-full h-11 text-gray-700 bg-gray-50 text-b3_com" variant={'default'}>
              날짜를 선택해주세요.
            </Button>
            {/* 높이에 따라 마진 오토 적용해야 됌 */}
            <div className="flex gap-2 py-2 mt-[110px]">
              <Button className="px-[26.5px] py-3.5 h-11 text-gray-300 bg-white border-[1px] border-gray-200 rounded-xl text-b3_com">
                초기화
              </Button>
              <Button className="py-3.5 w-full h-11 text-white bg-gray-200 rounded-xl text-b3_com">예약하기</Button>
            </div>
          </SheetHeader>
        </SheetLayout>
      </SheetContent>
    </Sheet>
  );
};
