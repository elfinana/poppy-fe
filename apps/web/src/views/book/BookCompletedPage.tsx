'use client';
import { bell, book } from '@/public';
import { PrimaryButton, SecondaryButton } from '@/src/shared';
import { ChevronHeader } from '@/src/widgets';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { security } from './const';
import { formatWithThousandsSeparator } from '@/src/shared/lib/utils';
import { successPayment } from '@/src/widgets/book/api/bookApi';

const BookCompletedPage = ({ popupId }: { popupId: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');
  const [bookData, setBookData] = React.useState({
    popupStoreName: '',
    date: '',
    time: '',
    person: 0,
    paymentMethod: '토스페이',
    price: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!orderId || !paymentKey || !amount) {
          console.error('orderId, paymentKey, amount를 참조하셨습니다.');
          return;
        }
        const response = await successPayment(orderId, amount, paymentKey);
        setBookData(prevState => ({
          ...prevState,
          popupStoreName: response.popupStoreName,
          date: response.date,
          time: response.time,
          person: response.person,
          price: response.price,
        }));
      } catch (error) {
        console.error('데이터 로딩 중 오류 발생:', error);
      }
    };
    fetchData();
  }, [orderId, paymentKey, amount]);

  const detailButtonClickHandler = () => {
    router.push(`/detail/${popupId}/book/completed/detail?bookData=${JSON.stringify(bookData)}`);
  };
  const goBackButtonClickHandler = () => {
    router.push(`/detail/${popupId}`);
  };
  return (
    <div className="flex flex-col items-center h-full">
      <ChevronHeader title="예약 완료" edit={false} />
      <div className="flex flex-col justify-center items-center mt-12 mb-[60px]">
        <Image src={bell} alt="bell-img" width={160} height={160} />
        <span className="text-gray-900 text-h2">예약이 완료되었습니다.</span>
      </div>
      <hr className="w-full h-2 bg-gray-50 border-0" />

      <div className="pt-[20px] px-16 pb-[24px] w-full flex flex-col gap-[16px]">
        <span className="text-gray-900 text-h2">예약 정보</span>
        <div className="flex items-center w-full">
          <Image className="border rounded-4 min-w-[104px]" src={book} alt="book" width={72} height={72} />

          <div className="ml-12">
            <span className="block mb-8 text-gray-900 text-h4">{bookData.popupStoreName}</span>
            <div>
              <div className="mb-2">
                <span className="mr-8 text-gray-400 text-b5">일정</span>
                <span className="text-gray-700 text-b5">
                  {bookData.date} {bookData.time}
                </span>
              </div>
              <div>
                <span className="mr-8 text-gray-400 text-b5">위치</span>
                <span className="text-gray-700 text-b5">{bookData.person}명</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full h-2 bg-gray-50 border-0" />

      <div className="pt-[24px] px-16 pb-[94px] w-full flex flex-col gap-[20px]">
        <span className="text-gray-900 text-h2">결제 정보</span>
        <div className="">
          <div className="mb-4">
            <span className="pr-12 text-gray-400 text-b3">결제방법</span>
            <span className="text-gray-600 text-b2">{bookData.paymentMethod}</span>
          </div>
          <div className="mb-12">
            <span className="pr-12 text-gray-400 text-b3">결제금액</span>
            <span className="text-gray-600 text-b2">
              {formatWithThousandsSeparator(bookData.price * bookData.person + security)}원
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-8 px-16 py-8 w-full">
        <SecondaryButton variant={'default'} onClick={detailButtonClickHandler} className="w-full">
          상세보기
        </SecondaryButton>
        <PrimaryButton variant={'enabled'} onClick={goBackButtonClickHandler} className="w-full">
          확인
        </PrimaryButton>
      </div>
    </div>
  );
};

export default BookCompletedPage;
