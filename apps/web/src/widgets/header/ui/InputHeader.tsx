'use client';

import React from 'react';
import { BackDark } from '@/public';
import { useRouter } from 'next/navigation';
import { Input } from '@/src/shared';

type Props = {
  defaultText?: string;
};

export const InputHeader = (props: Props) => {
  const router = useRouter();

  return (
    <div className="flex px-16 w-full relative top-0 bg-white z-50">
      <div className="inline-flex">
        <button onClick={() => router.back()}>
          <BackDark />
        </button>
      </div>
      <Input variantType="search" />
    </div>
  );
};
