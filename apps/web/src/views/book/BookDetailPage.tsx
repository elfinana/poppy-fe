'use client';
import { formatWithThousandsSeparator } from '@/src/shared/lib/utils';
import { ChevronHeader } from '@/src/widgets';
import Image from 'next/legacy/image';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { cancelReservation, getPopupDetail, getReservationDetail } from '@/src/widgets/book/api/bookApi';
import { useQueries } from 'react-query';
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

const BookDetailPage = () => {
  const searchParams = useSearchParams();

  const reservationId = searchParams.get('reservationId');
  if (!reservationId) throw new Error('reservationId is empty');

  const popupId = searchParams.get('popupId');
  if (!popupId) throw new Error('popupId is empty');

  const { token } = useLoginStore();
  if (!token) throw new Error('token is empty');
  const showFooterParam = searchParams.get('showFooterParam') === 'true';

  // 0번 = 예약 데이터
  // 1번 = 팝업스토어 데이터
  const queries = useQueries([
    {
      queryKey: ['getReservationDetail', reservationId],
      queryFn: () => getReservationDetail(reservationId, token),
    },
    {
      queryKey: ['getPopupDetail', popupId],
      queryFn: () => getPopupDetail(Number(popupId)),
    },
  ]);

  const [isCanceled, setIsCanceled] = useState(false);

  useEffect(() => {
    if (queries[0]?.data?.status === 'CANCELED') {
      setIsCanceled(true);
    }
  }, [queries]);

  //예약취소
  const handleCancel = async (): Promise<void> => {
    try {
      const result = await cancelReservation(reservationId, token);

      if (result.success) {
        // 예약 상세 조회
        const updatedReservation = await getReservationDetail(reservationId, token);

        // 상태가 CANCELED이면 업데이트
        if (updatedReservation?.status === 'CANCELED') {
          setIsCanceled(true);
        }
      }
    } catch (e: any) {
      alert(e.message || '예약 취소에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center h-full">
      <ChevronHeader title="예약 상세" edit={false} />

      <div className="pt-[20px] px-16 pb-[24px] w-full flex flex-col gap-[16px]">
        <span className="text-gray-900 text-h2">예약 정보</span>

        <div className="rounded-12 border-[1px] border-gray-200 py-16 pl-12 pr-16">
          <div className="flex items-center w-full gap-x-12">
            {queries[1].isLoading ? (
              <Skeleton className="rounded-4 min-w-[104px] h-[104px] w-[104px]" />
            ) : (
              queries[1].data && (
                <Image
                  className="border rounded-4 min-w-[104px]"
                  src={queries[1].data.thumbnailUrl}
                  alt="book"
                  width={104}
                  height={104}
                />
              )
            )}

            <div className="my-[10px] ml-12">
              {queries[0].isLoading ? (
                <span className="block h-20 mb-8">
                  <Skeleton className="w-[120px] h-[15px]" />
                </span>
              ) : (
                queries[0].data && (
                  <span className="block mb-8 text-gray-900 text-h4">{queries[0].data.popupStoreName}</span>
                )
              )}
              <div className="flex flex-col gap-4 leading-[16px]">
                <div className="flex items-start">
                  <span className="mr-8 text-gray-400 align-top text-b5 text-nowrap">일정</span>
                  {queries[0].isLoading ? (
                    <span className="h-[16px]">
                      <Skeleton className="h-[13px] w-[120px]" />
                    </span>
                  ) : (
                    queries[0].data && (
                      <span className="text-gray-700 text-b5">
                        {queries[0].data.date} {queries[0].data.time}
                      </span>
                    )
                  )}
                </div>
                <div className="flex items-start">
                  <span className="mr-8 text-gray-400 text-b5 text-nowrap">위치</span>
                  {queries[0].isLoading ? (
                    <span className="h-[16px]">
                      <Skeleton className="h-[13px] w-[120px]" />
                    </span>
                  ) : (
                    queries[0].data && <span className="text-gray-700 text-b5">{queries[0].data.address}</span>
                  )}
                </div>
                <div className="flex items-start">
                  <span className="mr-8 text-gray-400 text-b5 text-nowrap">인원</span>
                  {queries[0].isLoading ? (
                    <span className="h-[16px]">
                      <Skeleton className="h-[13px] w-[32px]" />
                    </span>
                  ) : (
                    queries[0].data && <span className="text-gray-700 text-b5">{queries[0].data.person}명</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full h-2 border-0 bg-gray-50" />

      <div className="pt-[20px] pl-16 pb-[24px] w-full flex flex-col gap-[20px]">
        <span className="text-gray-900 text-h2">예약자 정보</span>
        <div>
          <div>
            <div className="flex items-center mb-2 gap-x-12">
              <span className="text-gray-400 text-b3">예약자</span>
              {queries[0].isLoading ? (
                <Skeleton className="w-[100px] h-[14px]" />
              ) : (
                queries[0].data && <span className="text-gray-600 text-b2">{queries[0].data.userNickname}</span>
              )}
            </div>
            <div className="flex items-center gap-x-12">
              <span className="text-gray-400 text-b3">연락처</span>
              {queries[0].isLoading ? (
                <Skeleton className="w-[100px] h-[14px]" />
              ) : (
                queries[0].data && <span className="text-gray-600 text-b2">{queries[0].data.phoneNumber}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <hr className="w-full h-2 border-0 bg-gray-50" />

      <div className="pt-[24px] px-16 pb-[100px] w-full flex flex-col gap-[20px]">
        <span className="text-gray-900 text-h2">결제 정보</span>
        <div className="">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-b3">상품금액</span>
            {queries[0].isLoading ? (
              <Skeleton className="w-[100px] h-[14px]" />
            ) : (
              queries[0].data && (
                <span className="text-gray-600 text-b2">{formatWithThousandsSeparator(queries[0].data.amount)}원</span>
              )
            )}
          </div>
          {/* <div className="flex justify-between mb-12">
            <span className="text-gray-400 text-b3">보증금</span>
            <span className="text-gray-600 text-b2">{formatWithThousandsSeparator(security)}원</span>
          </div> */}
          <div className="border-b-[1px] border-gray-100 mb-12" />
          <div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-b2">총 결제금액</span>
              {queries[0].isLoading ? (
                <span className="flex items-center h-24">
                  <Skeleton className="w-[120px] h-[17px]" />
                </span>
              ) : (
                queries[0].data && (
                  <span className="text-blue-700 text-h2">
                    {formatWithThousandsSeparator(queries[0].data.amount)}원
                  </span>
                )
              )}
            </div>
            <div className="flex items-center justify-end">
              {queries[0].isLoading ? (
                <span className="flex items-center h-20">
                  <Skeleton className="w-[100px] h-[14px]" />
                </span>
              ) : (
                queries[0].data && <span className="text-gray-600 text-b3">{queries[0].data.paymentMethod}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {showFooterParam && (
        <footer className="absolute w-full bottom-0 py-[8px] bg-white flex px-[16px] h-[64px] gap-x-[12px] items-center border border-t-gray-100">
          <AlertDialog>
            <AlertDialogTrigger
              className={`w-full inline-flex items-center justify-center h-48 px-10 text-white rounded-12 py-14 text-h3 ${
                isCanceled ? 'bg-gray-200' : 'bg-blue-500'
              }`}
              variant="enabled"
              disabled={isCanceled}>
              {isCanceled ? '예약 취소' : '예약 취소하기'}
            </AlertDialogTrigger>
            {!isCanceled && (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>예약 취소</AlertDialogTitle>
                  <AlertDialogDescription>예약을 취소하시겠습니까?</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel />
                  <AlertDialogAction variant="warning" onClick={handleCancel} />
                </AlertDialogFooter>
              </AlertDialogContent>
            )}
          </AlertDialog>
        </footer>
      )}
    </div>
  );
};

export default BookDetailPage;
