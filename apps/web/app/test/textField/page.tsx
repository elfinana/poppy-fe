'use client';

import { Input, Textarea } from '@/src/shared';
import React from 'react';

type Props = {};

export default function Page() {
  const data = {
    nickName: 'test',
  };

  const handleClick = () => {
    alert('test');
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <Input label="닉네임" />
      <Textarea />
      <Input variantType="search" onClick={handleClick} />
    </div>
  );
}
