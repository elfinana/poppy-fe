import React from 'react';
import { PoppyHomeHeader } from '@/public';
import { IconButton } from '@/src/shared';

type Props = {};

export const HomeHeader = (props: Props) => {
  return (
    <div className="flex justify-between w-full">
      <div>
        <PoppyHomeHeader />
      </div>
      <div className="flex">
        <div className="mr-24">
          <IconButton size="md" icon="searchLarge" />
        </div>
        <div>
          <IconButton size="md" icon="notificationOutlined" />
        </div>
      </div>
    </div>
  );
};
