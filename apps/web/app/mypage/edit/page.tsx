'use client';

import { changeNickName } from '@/src/entities';
import { Input, PrimaryButton } from '@/src/shared';
import { ChevronHeader } from '@/src/widgets';
import React from 'react';
import { useLoginStore, useUserInfo } from 'store/login/loginStore';

const Page = () => {
  const [active, setActive] = React.useState(false);
  const userData = useUserInfo();
  const { token } = useLoginStore();

  const handleOnClick = async () => {
    await changeNickName();
  };

  return (
    <div>
      <ChevronHeader title="알림 설정" edit={false} />
      <div className="px-16 mt-16">
        <Input label="닉네임" />
      </div>
      <div>
        <PrimaryButton variant={active ? 'enabled' : 'disabled'} onClick={} />
      </div>
    </div>
  );
};

export default Page;
