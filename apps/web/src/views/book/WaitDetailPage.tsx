'use client';
import { formatWithThousandsSeparator } from '@/src/shared/lib/utils';
import { ChevronHeader } from '@/src/widgets';
import Image from 'next/legacy/image';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  cancelReservation,
  cancelWaiting,
  getPopupDetail,
  getReservationDetail,
  getWaitingDetail,
} from '@/src/widgets/book/api/bookApi';
import { useQueries, useQuery } from 'react-query';
import { useLoginStore } from 'store/login/loginStore';
import {
  PrimaryButton,
  Skeleton,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/src/shared';

const WaitDetailPage = () => {
  const searchParams = useSearchParams();

  const WaitingId = searchParams.get('WaitingId');
  if (!WaitingId) throw new Error('WaitingId is empty');

  const userId = searchParams.get('userId');
  if (!userId) throw new Error('userId is empty');

  const { token } = useLoginStore();
  if (!token) throw new Error('token is empty');

  //대기상세조회회
  const { data, isLoading, isError } = useQuery(
    ['getWaitingDetail', userId, WaitingId],
    () => getWaitingDetail(userId, WaitingId, token),
    {
      enabled: !!userId && !!WaitingId && !!token,
    },
  );

  const [isCanceled, setIsCanceled] = useState(false);

  //대기취소
  const handleCancel = async (): Promise<void> => {
    try {
      if (!data) {
        console.log('대기 상세 데이터가 없습니다:', data);
        throw new Error('대기 상세 데이터를 가져오지 못했습니다.');
      }
      if (!data?.storeId) {
        throw new Error('Store ID를 가져올 수 없습니다.');
      }

      const storeId = data.storeId.toString();
      console.log('아이디', storeId);
      const result = await cancelWaiting(userId, WaitingId, storeId, token);

      if (result.success) {
        setIsCanceled(true);
      }
    } catch (e: any) {
      // 에러 처리
      alert(e.message || '대기 취소에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center h-full">
      <ChevronHeader title="대기 상세" edit={false} />

      <div className="pt-[20px] px-16 pb-[24px] w-full flex flex-col gap-[16px]">
        <span className="text-gray-900 text-h2">대기 정보</span>

        <div className="rounded-12 border-[1px] border-gray-200 py-16 pl-12 pr-16">
          <div className="flex items-center w-full gap-x-12">
            {isLoading ? (
              <Skeleton className="rounded-4 min-w-[104px] h-[104px] w-[104px]" />
            ) : (
              data && (
                <Image
                  className="border rounded-4 min-w-[104px]"
                  src={data.thumbnailUrl || 'https://placehold.co/104'}
                  alt="book"
                  width={104}
                  height={104}
                />
              )
            )}

            <div className="my-[10px] ml-12">
              {isLoading ? (
                <span className="block h-20 mb-8">
                  <Skeleton className="w-[120px] h-[15px]" />
                </span>
              ) : (
                data && <span className="block mb-8 text-gray-900 text-h4">{data?.storeName}</span>
              )}
              <div className="flex flex-col gap-4 leading-[16px]">
                <div className="flex items-start">
                  <span className="mr-8 text-gray-400 align-top text-b5 text-nowrap">일정</span>
                  {isLoading ? (
                    <span className="h-[16px]">
                      <Skeleton className="h-[13px] w-[120px]" />
                    </span>
                  ) : (
                    data && (
                      <span className="text-gray-700 text-b5">
                        {data.date} {data.time}
                      </span>
                    )
                  )}
                </div>
                <div className="flex items-start">
                  <span className="mr-8 text-gray-400 text-b5 text-nowrap">위치</span>
                  {isLoading ? (
                    <span className="h-[16px]">
                      <Skeleton className="h-[13px] w-[120px]" />
                    </span>
                  ) : (
                    data && <span className="text-gray-700 text-b5">{data?.address}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full h-2 border-0 bg-gray-50" />

      <div className="pt-[20px] pl-16 pb-[24px] w-full flex flex-col gap-[20px]">
        <span className="text-gray-900 text-h2">대기자 정보</span>
        <div>
          <div>
            <div className="flex items-center mb-2 gap-x-12">
              <span className="text-gray-400 text-b3">예약자</span>
              {isLoading ? (
                <Skeleton className="w-[100px] h-[14px]" />
              ) : (
                data && <span className="text-gray-600 text-b2">{data?.nickname}</span>
              )}
            </div>
            <div className="flex items-center gap-x-12">
              <span className="text-gray-400 text-b3">연락처</span>
              {isLoading ? (
                <Skeleton className="w-[100px] h-[14px]" />
              ) : (
                data && <span className="text-gray-600 text-b2">{data?.phoneNumber}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <hr className="w-full h-2 border-0 bg-gray-50" />

      <footer className="absolute w-full bottom-0 py-[8px] bg-white flex px-[16px] h-[64px] gap-x-[12px] items-center border border-t-gray-100">
        <AlertDialog>
          <AlertDialogTrigger
            className={`w-full inline-flex items-center justify-center h-48 px-10 text-white rounded-12 py-14 text-h3 ${
              isCanceled ? 'bg-gray-200' : 'bg-blue-500'
            }`}
            variant="enabled"
            disabled={isCanceled}>
            {isCanceled ? '대기 취소' : '대기 취소하기'}
          </AlertDialogTrigger>
          {!isCanceled && (
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>대기 취소</AlertDialogTitle>
                <AlertDialogDescription>대기를 취소하시겠습니까?</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel />
                <AlertDialogAction variant="warning" onClick={handleCancel} />
              </AlertDialogFooter>
            </AlertDialogContent>
          )}
        </AlertDialog>
      </footer>
    </div>
  );
};

export default WaitDetailPage;
