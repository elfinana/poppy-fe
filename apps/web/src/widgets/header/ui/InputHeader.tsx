'use client';

import React from 'react';
import { BackDark } from '@/public';
import { useRouter } from 'next/navigation';
import { Input } from '@/src/shared';

type Props = {
  defaultText?: string;
  onSearch: (keyword: string) => void;
  onChange?: () => void;
};

export const InputHeader = (props: Props) => {
  const router = useRouter();
  let keyword = '';

  return (
    <div className="flex px-16 w-full relative top-0 bg-white z-50">
      <div className="inline-flex">
        <button onClick={() => router.back()}>
          <BackDark />
        </button>
      </div>
      <Input
        variantType="search"
        defaultText={props.defaultText}
        onClick={() => props.onSearch(keyword)}
        onChange={e => (keyword = e.target.value)}
      />
    </div>
  );
};
