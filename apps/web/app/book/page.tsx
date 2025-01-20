'use client';
import * as React from 'react';
import {
  ChoiceChipGroup,
  ChoiceChipGroupItem,
  IconButton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  SecondaryButton,
} from '@/src/shared';
import { BottomNavigation, NoChevronHeader } from '@/src/widgets';
import Image from 'next/legacy/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookListItem } from '@/src/entities/book';
import { getReservation, getWaiting } from '@/src/widgets/book/api/bookApi';
import { useQuery } from 'react-query';
import { useLoginStore } from 'store/login/loginStore';
import { ReservationData, ReservationTotalData, WaitingData } from '@/src/widgets/book/model/bookData';
import { Item } from '@radix-ui/react-radio-group';
type Props = {};

const BookItem = (item: BookListItem) => {
  const searchParams = useSearchParams();

  const reservationId = searchParams.get('reservationId');
  console.log('아이디', reservationId);
  const router = useRouter();

  const statusStyle: Record<'CHECKED' | 'VISITED' | 'CANCELED', string> = {
    CHECKED: 'text-h4 text-blue-600',
    VISITED: 'text-h4 text-gray-400',
    CANCELED: 'text-h4 text-warning',
  };

  const statusText: Record<'CHECKED' | 'VISITED' | 'CANCELED', string> = {
    CHECKED: '예약완료',
    VISITED: '방문완료',
    CANCELED: '예약취소',
  };

  const handleClick = () => {
    const showFooterParam = true;
    router.push(
      `/detail/${item.popupStoreId}/book/completed/detail?reservationId=${item.reservationId}&popupId=${item.popupStoreId}&showFooterParam=${showFooterParam}`,
    );
  };
  const currentStyle = statusStyle[item.status as 'CHECKED' | 'VISITED' | 'CANCELED'] || '';
  const currentText = statusText[item.status as 'CHECKED' | 'VISITED' | 'CANCELED'] || '상태 없음';

  return (
    <div className="flex flex-col p-12 mb-8 bg-white border border-gray-100 rounded gap-y-[8px]" onClick={handleClick}>
      <div className={currentStyle}>{currentText || '상태 없음'}</div>

      <div className="flex gap-x-[12px]">
        <Image
          className="rounded-4"
          src={item.thumbnail || 'https://placehold.co/500/webp'}
          alt={`Thumbnail for ${item.popupStoreName}`}
          width={104}
          height={104}
        />
        <div className="flex flex-col gap-y-[8px]  justify-center">
          <span className="text-gray-900 text-h4">{item.popupStoreName}</span>
          <div className=" text-b5">
            <div className="flex gap-x-[8px]">
              <p className="text-gray-400 min-w-[23px] ">일정</p>
              <p className="text-gray-700">{item.reservationDate}</p>
            </div>
            <div className="flex gap-x-[8px]">
              <p className="text-gray-400 min-w-[23px]">위치</p>
              <p className="text-gray-700">{item.location}</p>
            </div>
            <div className="flex gap-x-[8px]">
              <p className="text-gray-400 min-w-[23px]">인원</p>
              <p className="text-gray-700">{item.person}명</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WaitItem = (item: BookListItem) => {
  const router = useRouter();
  const handleClick = () => {
    console.log('이따따');
    // router.push(`/book/wait/${item.storeId}`);
  };

  return (
    <div className="flex flex-col p-12 mb-8 bg-white border border-gray-100 rounded gap-y-[8px]" onClick={handleClick}>
      <div className="flex gap-x-[12px]">
        {/* <Image
          className="rounded-4"
          src={`https://placehold.co/500/webp`}
          alt={`ITEM_${item.storeId}`}
          width={104}
          height={104}
        /> */}
        <div className="flex flex-col gap-y-[8px]  justify-center">
          <span className="text-gray-900 text-h4">{item.popupStoreName}</span>
          <div className=" text-b5">
            <div className="flex gap-x-[8px]">
              <p className="text-gray-400 min-w-[23px] ">일정2</p>
              <p className="text-gray-700">{item.reservationDate}</p>
            </div>
            <div className="flex gap-x-[8px]">
              <p className="text-gray-400 min-w-[23px]">위치</p>
              <p className="text-gray-700">{item.location}</p>
            </div>
            <div className="flex gap-x-[8px]">
              <p className="text-gray-400 min-w-[23px]">인원</p>
              <p className="text-gray-700">{item.person}명</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = (props: Props) => {
  const chipItem = ['전체', '예약완료', '방문완료', '예약취소'] as const;
  const [selectedStatus, setSelectedStatus] = React.useState<(typeof chipItem)[number]>('전체'); // 타입을 지정

  const handleTabChange = (tab: string) => {
    setSelectedStatus('전체');
  };

  const { token } = useLoginStore();

  const {
    data: reservationData = [],
    isLoading,
    error,
  } = useQuery<ReservationTotalData[]>(['reservations'], () => getReservation(token as string), {
    enabled: !!token, // 토큰이 존재할 때만 활성화
    keepPreviousData: true, // 이전 데이터를 유지
  });
  const userId = reservationData.length > 0 ? reservationData[0].userId : null;

  const { data: waitingData = [] } = useQuery<WaitingData[]>(
    ['reservations'],
    () => getWaiting(Number(token), userId as string),
    {
      enabled: !!token, // 토큰이 존재할 때만 활성화
      keepPreviousData: true, // 이전 데이터를 유지
    },
  );

  console.log('확', waitingData);
  // 상태별로 필터링
  const statusMap = {
    예약완료: 'CHECKED',
    방문완료: 'VISITED',
    예약취소: 'CANCELED',
  } as const;

  // 상태에 맞는 데이터만 필터링하는 함수
  const filteredData = reservationData.filter(item => {
    if (item.status === 'PENDING') return false;
    if (selectedStatus === '전체') return true; // 전체 선택 시 모든 데이터 포함
    return item.status === statusMap[selectedStatus]; // 상태 매칭
  });

  return (
    <div className="h-full">
      <Tabs defaultValue="reservations" onValueChange={handleTabChange} className="flex flex-col w-full bg-gray-50 ">
        <div className="relative">
          <NoChevronHeader title="예약" />
          <TabsList className="px-0 pt-8 pb-0 bg-white">
            <TabsTrigger value="reservations">예약내역</TabsTrigger>
            <TabsTrigger value="waitings">대기내역</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="reservations" className="my-0">
          <div className="px-16 py-12 bg-gray-50">
            <ChoiceChipGroup className="flex flex-row gap-x-[8px]" defaultValue={'전체'}>
              {chipItem.map(item => (
                <ChoiceChipGroupItem
                  key={item}
                  value={item}
                  onClick={() => setSelectedStatus(item)} // 클릭 시 상태 변경
                >
                  {item}
                </ChoiceChipGroupItem>
              ))}
            </ChoiceChipGroup>
            {/* 예약 항목들 필터링 후 표시 */}
            {reservationData.length > 0 ? (
              <div className="overflow-y-scroll h-[calc(100vh-218px)] mt-[12px]">
                {filteredData.map((item, idx) => (
                  <BookItem
                    key={`ITEM_${idx}`}
                    thumbnail={item.thumbnail}
                    popupStoreName={item.popupStoreName}
                    reservationDate={item.reservationDate}
                    reservationTime={item.reservationTime}
                    location={item.location}
                    person={item.person}
                    status={item.status as 'CHECKED' | 'VISITED' | 'CANCELED'}
                    reservationId={item.reservationId}
                    popupStoreId={item.popupStoreId}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center mt-32 h-[380px]">
                <Image src="/empty/emptystore.webp" alt="Empty Store" width={200} height={200} />
                <span className="text-gray-900 text-b1">예약한 스토어가 없어요.</span>
                <span className="mt-4 text-gray-500 text-b3">관심 있는 팝업스토어를 예약해 보세요.</span>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="waitings" className="my-0 ">
          <div className="px-16 py-12 bg-gray-50">
            <ChoiceChipGroup className="flex flex-row gap-x-[8px]" defaultValue={'전체'}>
              {chipItem.map(item => (
                <ChoiceChipGroupItem
                  key={item}
                  value={item}
                  onClick={() => setSelectedStatus(item)} // 클릭 시 상태 변경
                >
                  {item}
                </ChoiceChipGroupItem>
              ))}
            </ChoiceChipGroup>
            {/* 예약 항목들 필터링 후 표시 */}
            {/* <div className="overflow-y-scroll h-[calc(100vh-218px)] mt-[12px]">
              {waitingData.map((item, idx) => (
                <WaitItem
                  key={`ITEM_${idx}`}
                  thumbnail={item.thumbnail}
                  storeId={item.storeId}
                  userId={item.userId}
                  popupStoreName={item.popupStoreName}
                  reservationStatus={item.reservationStatus}
                  reservationDate={item.reservationDate}
                  reservationTime={item.reservationTime}
                  location={item.location}
                  person={item.person}
                  status={item.status}
                />
              ))}
            </div> */}
          </div>
        </TabsContent>
      </Tabs>
      <BottomNavigation />
    </div>
  );
};

export default Page;
