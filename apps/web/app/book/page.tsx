'use client';

import { BookListItem } from '@/src/entities';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared';
import { NoChevronHeader } from '@/src/widgets';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();

  const BookItem = (item: BookListItem) => {
    const status = [
      // status가 문자열일 경우 객체로 바꾸기
      { style: 'text-h4 text-blue-600', text: '예약완료' },
      { style: 'text-h4 text-warning', text: '예약취소' },
      { style: 'text-h4 text-gray-400', text: '방문완료' },
    ];

    return (
      <div
        className="flex flex-col rounded border border-gray-100 bg-white p-12 mb-8"
        onClick={() => router.push(`/book/${item.id}/`)}>
        <div className={status[item.reservationStatus].style}>{status[item.reservationStatus].text}</div>
      </div>
    );
  };

  return (
    <div className="h-full">
      <Tabs defaultValue="reservations" className="flex flex-col w-full h-full bg-gray-50">
        <div className="relative">
          <NoChevronHeader title="예약" />
          <TabsList className="px-0 bg-white pb-0 pt-8">
            <TabsTrigger value="reservations">예약내역</TabsTrigger>
            <TabsTrigger value="waitings">대기내역</TabsTrigger>
            <TabsTrigger value="notifications">알림</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="reservations" className="h-full overflow-y-scroll my-0">
          <div className="bg-gray-50 px-16 py-12">
            {reservationData.map((item, idx) => (
              <BookItem
                key={`ITEM_${idx}`}
                id={item.id}
                storeId={item.storeId}
                popupStoreName={item.popupStoreName}
                reservationStatus={item.reservationStatus}
                reservationDate={item.reservationDate}
                reservationTime={item.reservationTime}
                location={item.location}
                person={item.person}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="waitings" className="h-full overflow-y-scroll my-0">
          <div className="bg-gray-50 px-16 py-12">
            {reservationData.map((item, idx) => (
              <BookItem
                key={`ITEM_${idx}`}
                id={item.id}
                storeId={item.storeId}
                popupStoreName={item.popupStoreName}
                reservationStatus={item.reservationStatus}
                reservationDate={item.reservationDate}
                reservationTime={item.reservationTime}
                location={item.location}
                person={item.person}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="notifications" className="h-full overflow-y-scroll my-0">
          <div className="bg-gray-50 px-16 py-12">
            {reservationData.map((item, idx) => (
              <BookItem
                key={`ITEM_${idx}`}
                id={item.id}
                storeId={item.storeId}
                popupStoreName={item.popupStoreName}
                reservationStatus={item.reservationStatus}
                reservationDate={item.reservationDate}
                reservationTime={item.reservationTime}
                location={item.location}
                person={item.person}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;

const reservationData: Array<BookListItem> = [
  {
    id: 0,
    storeId: 123,
    popupStoreName: '오둥이의 아르바이트',
    reservationStatus: 0,
    reservationDate: '2024. 11. 18(월)',
    reservationTime: '오후 1:00',
    location: '서울 강남구 강남대로 426',
    person: 2,
  },
  {
    id: 1,
    storeId: 325,
    popupStoreName: '롯데 크리스마스 마켓 2024',
    reservationStatus: 1,
    reservationDate: '2024. 11. 20(수)',
    reservationTime: '오후 2:00',
    location: '서울 송파구 올림픽로 300 잠실 롯데월드몰 잔디광장',
    person: 2,
  },
  {
    id: 2,
    storeId: 412,
    popupStoreName: '제로이드 X 올리브영 팝업스토어',
    reservationStatus: 2,
    reservationDate: '2024. 11. 01(월)',
    reservationTime: '오후 5:00',
    location: '서울 서초구 강남대로 429 올리브영 강남타운',
    person: 12,
  },
];
