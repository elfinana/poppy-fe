'use client';

import { ArrowRightSmall, ExternalLink } from '@/public';
import { ChevronHeader } from '@/src/widgets';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useLoginStore, useUserInfo } from 'store/login/loginStore';

type Props = {};

const Page = (props: Props) => {
  const { clearToken } = useLoginStore();
  const { setUserInfo } = useUserInfo();
  const router = useRouter();

  const noticeSettingClickHandler = () => {
    router.push('/mypage/settings/notice');
  };

  const handleClick = () => {
    clearToken();
    setUserInfo({
      userEmail: '',
      userNickname: '',
    });
    router.push('/');
  };

  const version = '1.0.0';

  return (
    <div>
      <ChevronHeader title="설정" edit={false} />
      <div className="flex flex-col px-16">
        <div className="flex items-center justify-between py-12" onClick={noticeSettingClickHandler}>
          <div className="text-gray-800 text-b1">알림 설정</div>
          <div>
            <ArrowRightSmall />
          </div>
        </div>
        <div className="flex items-center justify-between py-12">
          <div className="text-gray-800 text-b1">서비스 이용약관</div>
          <div>
            <ExternalLink />
          </div>
        </div>
        <div className="flex items-center justify-between py-12">
          <div className="text-gray-800 text-b1">버전</div>
          <div className="text-gray-400 text-b3_com">{`v ${version}`}</div>
        </div>
        <div className="flex items-center justify-between py-12">
          <button type="button" className="text-gray-800 text-b1" onClick={handleClick}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
