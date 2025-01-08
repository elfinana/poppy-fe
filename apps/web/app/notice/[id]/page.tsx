'use client';

import { getNoticeDetail, NoticeDetail } from '@/src/entities';
import { Skeleton } from '@/src/shared';
import { ChevronHeader } from '@/src/widgets';
import React from 'react';
import { useQuery } from 'react-query';
// import DOMPurify from 'dompurify';

const Page = ({ params }: { params: { id: string } }) => {
  const { data, error, isLoading } = useQuery(['getNoticeDetail', params.id], () => getNoticeDetail(params.id));

  // 화면에 출력할 html 코드에서 XSS 공격의 위험을 제거하기 위해 코드를 sanitization 함
  // const content = DOMPurify.sanitize(data.content);

  return (
    <div>
      <div>
        <ChevronHeader title="공지사항" edit={false} />
      </div>
      {isLoading ? (
        <div className="flex flex-col px-16 mt-16">
          <Skeleton className="h-24 w-[300px]" />
          <Skeleton className="h-16 mt-4 w-[100px]" />
          <Skeleton className="h-20 mt-24" />
        </div>
      ) : (
        data && (
          <div className="flex flex-col px-16 mt-16">
            <div className="text-gray-900 text-h2">{data.title}</div>
            <div className="mt-4 text-gray-500 text-b5">{data.createdDate}</div>
            <div className="mt-24 text-gray-800 text-b3" dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        )
      )}
    </div>
  );
};

export default Page;
