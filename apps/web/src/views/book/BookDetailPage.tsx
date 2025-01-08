'use client';
import { book } from '@/public';
import { formatWithThousandsSeparator } from '@/src/shared/lib/utils';
import { ChevronHeader } from '@/src/widgets';
import Image from "next/legacy/image";
import React from 'react';
import { bookData, security, storeData, userData } from './const';

const BookDetailPage = () => {
  return (
    <div className="flex flex-col items-center h-full">
      <ChevronHeader title="예약 상세" edit={false} />

      <div className="pt-[20px] px-16 pb-[24px] w-full flex flex-col gap-[16px]">
        <span className="text-gray-900 text-h2">예약 정보</span>

        <div className="rounded-12 border-[1px] border-gray-200 py-16 pl-12 pr-[42px]">
          <div className="flex justify-between items-center w-full">
            <Image className="border rounded-4 min-w-[104px]" src={book} alt="book" width={104} height={104} />

            <div className="my-[10px] ml-12">
              <span className="block mb-8 text-gray-900 text-h4">{storeData.name}</span>
              <div className="flex flex-col gap-4 leading-[16px]">
                <div className="min-w-[173px]">
                  <span className="mr-8 text-gray-400 text-b5">일정</span>
                  <span className="text-gray-700 text-b5">{bookData.date}</span>
                </div>
                <div>
                  <span className="mr-8 text-gray-400 text-b5">위치</span>
                  <span className="text-gray-700 text-b5">{storeData.address}</span>
                </div>
                <div>
                  <span className="mr-8 text-gray-400 text-b5">인원</span>
                  <span className="text-gray-700 text-b5">{bookData.people}명</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full h-2 bg-gray-50 border-0" />

      <div className="pt-[20px] pl-16 pb-[24px] w-full flex flex-col gap-[20px]">
        <span className="text-gray-900 text-h2">예약자 정보</span>
        <div className="">
          <div>
            <div className="mb-2">
              <span className="mr-12 text-gray-400 text-b3">예약자</span>
              <span className="text-gray-600 text-b2">{userData.name}</span>
            </div>
            <div>
              <span className="mr-12 text-gray-400 text-b3">연락처</span>
              <span className="text-gray-600 text-b2">{userData.phoneNumber}</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="w-full h-2 bg-gray-50 border-0" />

      <div className="pt-[24px] px-16 pb-[150px] w-full flex flex-col gap-[20px]">
        <span className="text-gray-900 text-h2">결제 정보</span>
        <div className="">
          <div className="flex justify-between mb-4">
            <span className="text-gray-400 text-b3">상품금액</span>
            <span className="text-gray-600 text-b2">{formatWithThousandsSeparator(bookData.cost)}원</span>
          </div>
          <div className="flex justify-between mb-12">
            <span className="text-gray-400 text-b3">보증금</span>
            <span className="text-gray-600 text-b2">{formatWithThousandsSeparator(security)}원</span>
          </div>
          <div className="border-b-[1px] border-gray-100 mb-12" />
          <div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-b2">총 결제금액</span>
              <span className="text-blue-700 text-h2">{formatWithThousandsSeparator(bookData.cost + security)}원</span>
            </div>
            <div className="flex justify-end">
              <span className="text-gray-600 text-b3">토스페이</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
