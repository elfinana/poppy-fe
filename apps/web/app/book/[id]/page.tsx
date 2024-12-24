import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  PrimaryButton,
} from '@/src/shared';
import { ChevronHeader } from '@/src/widgets';
import Image from 'next/image';
import React from 'react';

const page = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <div className="w-full">
      <ChevronHeader title={'예약 상세'} edit={false} />

      <div className="flex flex-col py-[20px] h-[calc(100vh-112px)]  overflow-y-auto">
        {/* 예약 정보 */}
        <div className="flex flex-col w-full px-16  gap-y-[12px] ">
          <label className="text-gray-900 text-h2 ">예약 정보</label>
          <div className="py-[16px] px-[12px] border border-gray-200 rounded-12">
            <div className="flex gap-x-[12px]">
              <Image
                className="rounded-4"
                src={`https://placehold.co/500/webp`}
                alt={`ITEM_${id}`}
                width={104}
                height={104}
              />
              <div className="flex flex-col gap-y-[8px] justify-center">
                <span className="text-gray-900 text-h4">오둥이의 아르바이트</span>
                <div className="text-b5">
                  <div className="flex gap-x-[8px]">
                    <p className="text-gray-400 min-w-[23px] ">일정</p>
                    <p className="text-gray-700">2024. 11. 18(월) 오후 1:00</p>
                  </div>
                  <div className="flex gap-x-[8px]">
                    <p className="text-gray-400 min-w-[23px]">위치</p>
                    <p className="text-gray-700">서울 강남구 강남대로 426</p>
                  </div>
                  <div className="flex gap-x-[8px]">
                    <p className="text-gray-400 min-w-[23px]">인원</p>
                    <p className="text-gray-700">2명</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className=" bg-gray-50 py-[4px] mt-[24px] mb-[20px] border-none" />
        {/* 예약자 정보 */}
        <div className="flex flex-col px-16 gap-y-[20px]">
          <label className="text-gray-900 text-h2">예약자 정보</label>
          <div>
            <div className="flex gap-x-[12px]">
              <p className="text-gray-400 text-b3 min-w-[23px]">예약자</p>
              <p className="text-gray-600 text-b2">신민경</p>
            </div>
            <div className="flex gap-x-[12px]">
              <p className="text-gray-400 text-b3 min-w-[23px]">연락처</p>
              <p className="text-gray-600 text-b2">010-1234-5678</p>
            </div>
          </div>
        </div>

        <hr className=" bg-gray-50 py-[4px] mt-[24px] mb-[20px] border-none" />
        {/* 결제 정보 */}
        <div className="flex flex-col px-16 gap-y-[20px]">
          <label className="text-gray-900 text-h2">결제 정보</label>
          <div className="flex flex-col gap-y-[12px]">
            <div className="flex justify-between">
              <p className="text-gray-400 text-b3 min-w-[23px]">상품금액</p>
              <p className="text-gray-600 text-b2">20,000원</p>
            </div>
            <hr className="bg-gray-50" />
            <div className="flex justify-between">
              <p className="text-gray-600 text-b2 min-w-[23px]">총 결제금액</p>
              <div className="text-right">
                <p className="text-blue-700 text-h2">20,000원</p>
                <p className="text-gray-600 text-b3">토스페이</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="absolute w-full bottom-0 py-[8px] bg-white flex px-[16px] h-[64px] gap-x-[12px] items-center border border-t-gray-100">
        <AlertDialog>
          <AlertDialogTrigger className="w-full" variant="enabled">
            <div className="inline-flex items-center justify-center w-full h-48 px-10 text-white bg-blue-500 rounded-12 py-14 text-h3">
              예약 취소하기
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>예약 취소</AlertDialogTitle>
              <AlertDialogDescription>예약을 취소하시겠습니까?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel />
              <AlertDialogAction variant="warning" />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </footer>
    </div>
  );
};

export default page;
