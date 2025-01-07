import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  DatePicker,
  PrimaryButton,
  SecondaryButton,
} from '@/src/shared';
import React from 'react';
import BookingForm from './BookingForm';
import { useRouter } from 'next/navigation';
import useBooking from '@/src/shared/lib/useBooking';
import { Time } from '@/src/entities/home/model/PopupData';
import { postReservation } from '../api/bookApi';
type Props = {
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  popupId: number;
  openingTime: Time;
  closingTime: Time;
  price: number;
  storeName: string;
  address: string;
};

const BookSheet = (props: Props) => {
  const router = useRouter();
  const { bookData, onSelect, onReset, countHandler, discountHandler, time, onSelectTime } = useBooking({
    popupId: props.popupId,
    openingTime: props.openingTime,
    closingTime: props.closingTime,
    price: props.price,
    storeName: props.storeName,
    address: props.address,
  });
  const { date: selectedDate, person } = bookData;

  const bookButtonClickHandler = async () => {
    const response = await postReservation(bookData);
    const orderId = response.orderId;
    router.push(`/detail/${props.popupId}/book?bookData=${JSON.stringify({ ...bookData, orderId })}`);
  };

  return (
    <div>
      <BottomSheet open={props.isBottomSheetOpen} onOpenChange={props.setIsBottomSheetOpen}>
        <BottomSheetContent>
          <BottomSheetHeader className="border-b-[1px] border-gray-100">
            <span className="mt-[18px] mb-16">예약 정보</span>
          </BottomSheetHeader>
          <div className="mx-24 mb-8 mt-[25px]">
            <DatePicker selectedDate={selectedDate} onSelect={onSelect} />
          </div>
          <div className=" border-t-[1px] border-gray-100">
            {!selectedDate && (
              <div className="flex justify-center items-center py-12 m-16 bg-gray-100 rounded">
                <span className="text-gray-700 text-b3">날짜를 선택해주세요.</span>
              </div>
            )}
            {selectedDate && (
              <BookingForm
                count={person}
                countHandler={countHandler}
                discountHandler={discountHandler}
                time={time}
                onSelectTime={onSelectTime}
              />
            )}
            <div className="flex gap-8 px-16 py-8">
              <SecondaryButton variant={selectedDate ? 'default' : 'disabled'} onClick={onReset}>
                초기화
              </SecondaryButton>
              <PrimaryButton variant={selectedDate ? 'enabled' : 'disabled'} onClick={bookButtonClickHandler}>
                예약하기
              </PrimaryButton>
            </div>
          </div>
        </BottomSheetContent>
      </BottomSheet>
    </div>
  );
};

export default BookSheet;
