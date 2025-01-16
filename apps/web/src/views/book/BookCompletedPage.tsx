'use client';
import { bell, book } from '@/public';
import { Hr, PrimaryButton, SecondaryButton, Skeleton } from '@/src/shared';
import { ChevronHeader, PopupListItem } from '@/src/widgets';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { security } from './const';
import { formatWithThousandsSeparator } from '@/src/shared/lib/utils';
import { getPopupDetail, getReservationDetail } from '@/src/widgets/book/api/bookApi';
import { useLoginStore } from 'store/login/loginStore';
import { useQueries, useQuery } from 'react-query';

const BookCompletedPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const reservationId = searchParams.get('reservationId');
  if (!reservationId || reservationId === 'undefined') throw new Error('reservationId is empty');

  const popupId = searchParams.get('popupId');
  if (!popupId || popupId === 'undefined') throw new Error('popupId is empty');

  const { token } = useLoginStore();
  if (!token) throw new Error('token is empty');

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

  const detailButtonClickHandler = () => {
    if (queries[0].data && queries[0].data.popupStoreId)
      router.push(
        `/detail/${queries[0].data.popupStoreId}/book/completed/detail?reservationId=${reservationId}&popupId=${popupId}`,
      );
  };

  const goBackButtonClickHandler = () => {
    if (queries[0].data && queries[0].data.popupStoreId) router.push(`/detail/${queries[0].data.popupStoreId}`);
  };

  return (
    <div className="flex flex-col items-center h-full min-h-screen">
      <ChevronHeader title="예약 완료" edit={false} />
      <div className="flex flex-col justify-center items-center mt-12 mb-[60px]">
        <Image src={bell} alt="bell-img" width={160} height={160} />
        <span className="text-gray-900 text-h2">예약이 완료되었습니다.</span>
      </div>
      <hr className="w-full h-2 border-0 bg-gray-50" />

      <div className="pt-[20px] px-16 pb-[24px] w-full flex flex-col gap-[16px]">
        <span className="text-gray-900 text-h2">예약 정보</span>
        <div className="flex items-center w-full">
          {queries[1].isLoading ? (
            <Skeleton className="w-[72px] h-[72px] rounded-4 aspect-square" />
          ) : (
            queries[1].data && (
              <Image
                className="border rounded-4 min-w-[104px] aspect-square"
                src={queries[1].data.thumbnailUrl}
                alt="book"
                width={72}
                height={72}
              />
            )
          )}

          <div className="ml-12">
            {queries[0].isLoading ? (
              <Skeleton className="block w-full h-16 mb-8" />
            ) : (
              queries[0].data && (
                <span className="block mb-8 text-gray-900 text-h4">{queries[0].data.popupStoreName}</span>
              )
            )}
            <div>
              <div className="mb-2">
                <span className="mr-8 text-gray-400 text-b5">일정</span>
                {queries[0].isLoading ? (
                  <Skeleton className="h-16 w-[150px]" />
                ) : (
                  queries[0].data && (
                    <span className="text-gray-700 text-b5">
                      {queries[0].data.date} {queries[0].data.time}
                    </span>
                  )
                )}
              </div>
              <div>
                <span className="mr-8 text-gray-400 text-b5">인원</span>
                {queries[0].isLoading ? (
                  <Skeleton className="h-16 w-[32px]" />
                ) : (
                  queries[0].data && <span className="text-gray-700 text-b5">{queries[0].data.person}명</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full h-2 border-0 bg-gray-50" />
      <Hr variant="light" />

      <div className="pt-[24px] px-16 pb-[94px] w-full flex flex-col gap-[20px] flex-grow">
        <span className="text-gray-900 text-h2">결제 정보</span>
        <div className="">
          <div className="mb-4">
            <span className="pr-12 text-gray-400 text-b3">결제방법</span>
            {queries[0].isLoading ? (
              <Skeleton className="w-[64px] h-20" />
            ) : (
              queries[0].data && <span className="text-gray-600 text-b2">{queries[0].data.paymentMethod}</span>
            )}
          </div>
          <div className="mb-12">
            <span className="pr-12 text-gray-400 text-b3">결제금액</span>
            {queries[0].isLoading ? (
              <Skeleton className="w-[64px] h-20" />
            ) : (
              queries[0].data && (
                <span className="text-gray-600 text-b2">{formatWithThousandsSeparator(queries[0].data.amount)}원</span>
              )
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full gap-8 px-16 py-8">
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
