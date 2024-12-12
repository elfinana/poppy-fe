import { NoticeListItem } from '@/src/entities';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared';
import { ChevronHeader, SubHeader } from '@/src/widgets';
import React from 'react';

type Props = {};

const page = (props: Props) => {
  const NoticeItem = (item: NoticeListItem) => (
    <div className="rounded border border-gray-100 bg-white p-12 mb-8">
      <div>
        <div className="text-h4 text-blue-600">{`[${item.type}]`}</div>
        <div className="text-b1 text-gray-800">{item.title}</div>
        <div className="text-c2 text-gray-300 mt-16">{`${item.date} ${item.time}`}</div>
      </div>
    </div>
  );

  return (
    <div className="h-full">
      <Tabs defaultValue="notifications" className="flex flex-col w-full h-full bg-gray-50">
        <div className="relative">
          <ChevronHeader title="알림" edit={false} />
          {/* <SubHeader label="알림" iconButton /> */}
          <TabsList className="px-0 bg-white pb-0">
            <TabsTrigger value="notifications">공지</TabsTrigger>
            <TabsTrigger value="activities">활동</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="notifications" className="h-full overflow-y-scroll my-0">
          <div className="bg-gray-50 px-16 py-12">
            {notificationsData.map((item, idx) => (
              <NoticeItem key={`ITEM_${idx}`} type={item.type} title={item.title} date={item.date} time={item.time} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="activities">
          <div className="bg-gray-50 px-16 py-12 overflow-scroll">
            {activitiesData.map((item, idx) => (
              <NoticeItem key={`ITEM_${idx}`} type={item.type} title={item.title} date={item.date} time={item.time} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;

const notificationsData: Array<NoticeListItem> = [
  { type: '공지사항', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { type: '이벤트', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { type: '공지사항', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { type: '공지사항', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { type: '이벤트', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { type: '공지사항', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { type: '공지사항', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { type: '이벤트', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { type: '공지사항', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { type: '공지사항', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { type: '이벤트', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
  { type: '공지사항', title: '개인정보 처리방침', date: '2024. 11. 10', time: '22:03' },
];

const activitiesData: Array<NoticeListItem> = [
  { type: '활동1', title: '최근 방문한 팝업스토어는 어떠셨나요?', date: '2024. 11. 10', time: '22:03' },
  { type: '활동2', title: '저장한 팝업스토어 곧 오픈해요!', date: '2024. 11. 10', time: '22:03' },
  { type: '활동3', title: 'POPPY에 오신 것을 환영합니다!', date: '2024. 11. 10', time: '22:03' },
];
