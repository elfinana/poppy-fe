'use client';

import { ActivityListItem, NoticeListItem } from '@/src/entities';
import { IconButton, Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared';
import { ChevronHeader, SubHeader } from '@/src/widgets';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();

  const NoticeItem = (item: NoticeListItem) => (
    <div
      className="p-12 mb-8 bg-white border border-gray-100 rounded"
      onClick={() => router.push(`/notice/${item.id}/`)}>
      <div>
        <div className="text-blue-600 text-h4">{`[${item.type}]`}</div>
        <div className="text-gray-800 text-b1">{item.title}</div>
        <div className="mt-16 text-gray-300 text-c2">{`${item.date} ${item.time}`}</div>
      </div>
    </div>
  );

  const ActivityItem = (item: ActivityListItem) => {
    const router = useRouter();

    const handleClick = () => {
      if (item.type === 'RESERVATION_confirm') {
        router.push(`/book/${item.userId}`);
      }
    };
    return (
      <div
        className="flex flex-col p-12 mb-8 bg-white border border-gray-100 rounded gap-y-[8px]"
        onClick={handleClick}>
        <div className="flex gap-x-[12px]">
          <IconButton size="xlg" icon="ic-noti-cal" />
          <div className="flex flex-col gap-y-[16px] w-full ">
            <div className="flex flex-col ">
              <span className="text-blue-600 text-h4">[{item.popupStoreName}]</span>
              <span className="text-gray-800 text-b1">{item.message}</span>
              {item.type === 'RESERVATION_confirm' && (
                <div className="bg-gray-50 rounded-4 text-b3_com p-[12px]  mt-[8px]">
                  <div className="flex gap-x-[8px]">
                    <p className="text-gray-400  min-w-[23px] ">일정</p>
                    <p className="text-gray-700">{item.date}</p>
                  </div>
                  <div className="flex gap-x-[8px]">
                    <p className="text-gray-400  min-w-[23px]">인원</p>
                    <p className="text-gray-700">{item.peopleAhead}명</p>
                  </div>
                </div>
              )}
              {item.type === 'TEAMS_AHEAD' && (
                <span className="text-gray-500 text-b5">잠시 후 입장 예정이니, 매장 앞에서 대기해 주세요.</span>
              )}
            </div>
            <div>
              <span className="text-gray-300 text-c2">{item.date}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full">
      <Tabs defaultValue="notifications" className="flex flex-col w-full h-full bg-gray-50">
        <div className="relative">
          <ChevronHeader title="알림" edit={false} />
          <TabsList className="px-0 pb-0 bg-white">
            <TabsTrigger value="notifications">공지</TabsTrigger>
            <TabsTrigger value="activities">활동</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="notifications" className="h-full my-0 overflow-y-scroll">
          <div className="px-16 py-12 bg-gray-50">
            {notificationsData.map((item, idx) => (
              <NoticeItem
                key={`ITEM_${idx}`}
                id={item.id}
                type={item.type}
                title={item.title}
                date={item.date}
                time={item.time}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="activities" className="h-full my-0 overflow-y-scroll">
          <div className="px-16 py-12 bg-gray-50">
            {}
            {activitiesData.map((item, idx) => (
              <ActivityItem
                key={`ITEM_${idx}`}
                userId={item.userId}
                storeId={item.storeId}
                popupStoreName={item.popupStoreName}
                type={item.type}
                message={item.message}
                date={item.date}
                isRead={item.isRead}
                peopleAhead={item.peopleAhead}
                waitingNumber={item.waitingNumber}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;

const notificationsData: Array<NoticeListItem> = [
  { id: 0, type: '공지사항', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { id: 1, type: '이벤트', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { id: 2, type: '공지사항', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { id: 3, type: '공지사항', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { id: 4, type: '이벤트', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { id: 5, type: '공지사항', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { id: 6, type: '공지사항', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { id: 7, type: '이벤트', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { id: 8, type: '공지사항', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { id: 9, type: '공지사항', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { id: 10, type: '이벤트', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { id: 11, type: '공지사항', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
];

const activitiesData: Array<ActivityListItem> = [
  {
    userId: 1,
    type: 'RESERVATION_confirm',
    storeId: 1,
    popupStoreName: '[오둥이의 아르바이트]',
    waitingNumber: 0,
    peopleAhead: 2,
    isRead: false,
    date: '2024. 11. 18(월) 오후 1:30',
    message: '예약이 확정되었습니다.',
  },
  {
    userId: 1,
    type: 'RESERVATION_cancel',
    storeId: 2,
    popupStoreName: '[롯데 크리스마스 마켓 2024]',
    waitingNumber: 4,
    peopleAhead: null,
    isRead: false,
    message: '예약이 취소되었습니다.',
    date: '2024. 11. 18(월) 오후 1:30',
  },
  {
    userId: 1,
    type: 'NOTICE',
    storeId: 3,
    popupStoreName: '팝업스토어',
    waitingNumber: 4,
    peopleAhead: null,
    isRead: false,
    message: '스토어가 오픈되었습니다.',
    date: '2024. 11. 18(월) 오후 1:30',
  },
  {
    userId: 1,
    type: 'TEAMS_AHEAD',
    storeId: 4,
    popupStoreName: '팝업스토어',
    waitingNumber: 4,
    peopleAhead: null,
    isRead: false,
    message: '앞으로 1팀 남았습니다.',
    date: '2024. 11. 18(월) 오후 1:30',
  },
];
