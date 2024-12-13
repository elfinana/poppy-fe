'use client';

import React from 'react';
import { IconButton } from '@/src/shared';
import { useRouter } from 'next/navigation';

type Props = {
  title: string;
};

export const NoChevronHeader = (props: Props) => {
  const router = useRouter();

  const noticeClickHandler = () => {
    router.push('/notice');
  };

  return (
    <div className="flex justify-between px-16 py-12 w-full relative top-0 bg-white z-50">
      <div className="grow text-h1">{props.title}</div>
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
