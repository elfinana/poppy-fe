import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  DatePicker,
  PrimaryButton,
  SecondaryButton,
  useCounter,
} from '@/src/shared';
import React from 'react';
import BookingForm from './ui/BookingForm';
import { useRouter } from 'next/navigation';
import useBooking from '@/src/shared/lib/useBooking';
import { Time } from '@/src/entities/home/model/PopupData';
import { postReservation } from './api/bookApi';
import { useLoginStore } from 'store/login/loginStore';
import { toast } from '@/src/shared/hooks/use-toast';

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
  const { token } = useLoginStore();

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
    if (token) {
      await postReservation(bookData, token)
        .then(res => {
          if (res.code === 200) {
            router.push(
              `/detail/${bookData.popupStoreId}/book?orderId=${res.data.orderId}&popupId=${bookData.popupStoreId}&person=${res.data.person}&date=${selectedDate}`,
            );
          } else if (res.code === 400) {
            toast({
              variant: 'destructive',
              title: '예약 불가',
              description: '이미 예약이 모두 찼습니다.',
            });
          } else if (res.code === 401) {
            toast({
              variant: 'destructive',
              title: '예약 불가',
              description: '로그인 세션이 만료되었습니다.',
            });
          } else if (res.code === 500) {
            toast({
              variant: 'destructive',
              title: '예약 불가',
              description: '해당 날짜에 이미 예약이 존재합니다.',
            });
          } else {
            alert('sdifjsdfij');
          }
        })
        .catch(err => {
          alert(JSON.stringify(err));
        });
    } else {
      toast({
        variant: 'destructive',
        title: '예약 불가',
        description: '로그인 세션이 만료되었습니다.',
      });
    }
  };

  return (
    <div>
      <BottomSheet open={props.isBottomSheetOpen} onOpenChange={props.setIsBottomSheetOpen}>
        <BottomSheetContent>
          <BottomSheetHeader className="border-b-[1px] border-gray-100">
            <span className="mt-[18px] mb-16">예약 정보</span>
          </BottomSheetHeader>
          <div className="mx-24 mb-8 mt-[25px]">
            <DatePicker selectedDate={new Date(selectedDate)} onDateChange={onSelect} />
          </div>
          <div className=" border-t-[1px] border-gray-100">
            {!selectedDate && (
              <div className="flex items-center justify-center py-12 m-16 bg-gray-100 rounded">
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
