'use client';

import React from 'react';
import { PoppyHomeHeader } from '@/public';
import { IconButton } from '@/src/shared';
import { useRouter } from 'next/navigation';

type Props = {};

export const HomeHeader = (props: Props) => {
  const router = useRouter();

  const noticeClickHandler = () => {
    router.push('/notice');
  };

  return (
    <div className="px-16 py-12 flex justify-between items-center w-full relative bg-white z-50">
      <div>
        <PoppyHomeHeader />
      </div>
      <div className="flex">
        <div className="mr-24">
          <IconButton size="md" icon="searchLarge" />
        </div>
        <div>
          <IconButton size="md" icon="notificationOutlined" onClick={noticeClickHandler} />
        </div>
      </div>
    </div>
  );
};
