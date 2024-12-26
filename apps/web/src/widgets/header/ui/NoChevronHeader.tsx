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
    <div className="relative top-0 z-50 flex justify-between w-full px-16 py-12 bg-white">
      <div className="grow text-h1">{props.title}</div>
      <div className="flex">
        <div>
          <IconButton size="md" icon="notificationOutlined" onClick={noticeClickHandler} />
        </div>
      </div>
    </div>
  );
};
