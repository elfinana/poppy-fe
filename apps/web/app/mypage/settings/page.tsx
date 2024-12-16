'use client';

import { ArrowRightSmall, ExternalLink } from '@/public';
import { ChevronHeader } from '@/src/widgets';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();

  const noticeSettingClickHandler = () => {
    router.push('/mypage/settings/notice');
  };

  const version = '1.0.0';

  return (
    <div>
      <ChevronHeader title="설정" edit={false} />
      <div className="flex flex-col px-16">
        <div className="flex justify-between items-center py-12" onClick={noticeSettingClickHandler}>
          <div className="text-b1 text-gray-800">알림 설정</div>
          <div>
            <ArrowRightSmall />
          </div>
        </div>
        <div className="flex justify-between items-center py-12">
          <div className="text-b1 text-gray-800">서비스 이용약관</div>
          <div>
            <ExternalLink />
          </div>
        </div>
        <div className="flex justify-between items-center py-12">
          <div className="text-b1 text-gray-800">버전</div>
          <div className="text-b3_com text-gray-400">{`v ${version}`}</div>
        </div>
        <div className="flex justify-between items-center py-12">
          <div className="text-b1 text-gray-800">로그아웃</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
