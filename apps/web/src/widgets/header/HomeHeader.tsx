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
        <div>
          <IconButton size="md" icon="ic-search" />
        </div>
        <div>
          <IconButton size="md" icon="notificationOutlined" />
        </div>
      </div>
    </div>
  );
};
