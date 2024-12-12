import { Tabs, TabsList, TabsTrigger } from '@/src/shared';
import { ChevronHeader } from '@/src/widgets';
import React from 'react';

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="h-48">
        <ChevronHeader title="알림" edit={false} />
      </div>
      <div>
        <Tabs defaultValue="notifications">
          <TabsList className="px-0">
            <TabsTrigger value="notifications">공지</TabsTrigger>
            <TabsTrigger value="activities">활동</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
