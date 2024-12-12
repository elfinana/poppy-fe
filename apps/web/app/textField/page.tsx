'use client';

import React from 'react';

import { Input, Textarea, IconButton, Calendar } from '../../src/shared/index';

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
      <Input label="닉네임" existingName={data.nickName} />
      <Textarea />
      <Input variantType="search" onClick={handleClick} />
      <IconButton size="lg" icon="ic-delete" />

      <Calendar />
    </div>
  );
}
