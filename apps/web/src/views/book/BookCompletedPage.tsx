'use client';
import { bell, book } from '@/public';
import { PrimaryButton, SecondaryButton } from '@/src/shared';
import { ChevronHeader } from '@/src/widgets';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { bookData, security, storeData } from './const';
import { formatWithThousandsSeparator } from '@/src/shared/lib/utils';

const BookCompletedPage = () => {
  const router = useRouter();
  const detailButtonClickHandler = () => {
    router.push('/detail/book/completed/detail');
  };
  const goBackButtonClickHandler = () => {
    router.push('/detail');
  };
  return (
    <div className="flex flex-col items-center h-full">
      <ChevronHeader title="예약 완료" edit={false} />
      <div className="flex flex-col justify-center items-center mt-12 mb-[60px]">
        <Image src={bell} alt="bell-img" width={160} height={160} />
        <span className="text-gray-900 text-h2">예약이 완료되었습니다.</span>
      </div>
      <div className="w-full h-2 bg-gray-50" />

      <div className="pt-[20px] px-16 pb-[24px] w-full flex flex-col gap-[16px]">
        <span className="text-gray-900 text-h2">예약 정보</span>
        <div className="flex items-center w-full">
          <Image className="border rounded-4 min-w-[104px]" src={book} alt="book" width={72} height={72} />

          <div className="ml-12">
            <span className="block mb-8 text-gray-900 text-h4">{storeData.name}</span>
            <div>
              <div className="mb-2">
                <span className="mr-8 text-gray-400 text-b5">일정</span>
                <span className="text-gray-700 text-b5">{bookData.date}</span>
              </div>
              <div>
                <span className="mr-8 text-gray-400 text-b5">위치</span>
                <span className="text-gray-700 text-b5">{bookData.people}명</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-2 bg-gray-50" />

      <div className="pt-[24px] px-16 pb-[94px] w-full flex flex-col gap-[20px]">
        <span className="text-gray-900 text-h2">결제 정보</span>
        <div className="">
          <div className="mb-4">
            <span className="pr-12 text-gray-400 text-b3">결제방법</span>
            <span className="text-gray-600 text-b2">토스페이</span>
          </div>
          <div className="mb-12">
            <span className="pr-12 text-gray-400 text-b3">결제금액</span>
            <span className="text-gray-600 text-b2">{formatWithThousandsSeparator(bookData.cost + security)}원</span>
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
