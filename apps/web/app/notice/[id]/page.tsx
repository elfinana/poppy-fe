import { NoticeDetail } from '@/src/entities';
import { ChevronHeader } from '@/src/widgets';
import React from 'react';
// import DOMPurify from 'dompurify';

const page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id = (await params).id;

  // 화면에 출력할 html 코드에서 XSS 공격의 위험을 제거하기 위해 코드를 sanitization 함
  // const content = DOMPurify.sanitize(data.content);

  return (
    <div>
      <div>
        <ChevronHeader title={data.type} edit={false} />
      </div>
      <div className="flex flex-col px-16 mt-16">
        <div className="text-h2 text-gray-900">{`[${data.type}] ${data.title} ${id}`}</div>
        <div className="text-b5 text-gray-500 mt-4">{`${data.date} ${data.time}`}</div>
        <div className="text-b3 text-gray-800 mt-24" dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    </div>
  );
};

const data: NoticeDetail = {
  id: 0,
  type: '공지사항',
  title: '개인정보 처리방침',
  date: '2024. 11. 10.',
  time: '22:03',
  content:
    '안녕하세요.<br/>어쩌구저쩌구 Poppy입니다.<br/><br/>고객님께 더 나은 서비스를 제공할 수 있도록,<br/>2024년 12월 23일(월)에 Poppy 개인정보 처리방침이 개정될 예정입니다.<br/>개정될 주요 내용은 아래 표를 참고해 주세요.<br/><br/>어쩌구저쩌구',
};

export default page;
