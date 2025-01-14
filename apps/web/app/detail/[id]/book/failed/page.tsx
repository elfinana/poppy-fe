import { useSearchParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const searchParams = useSearchParams();

  return <div>{searchParams.get('message')}</div>;
};

export default Page;
