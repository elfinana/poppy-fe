import CheckoutPage from '@/src/views/book/CheckoutPage';
import React from 'react';

const page = ({ params: { id } }: { params: { id: number } }) => {
  return <CheckoutPage />;
};

export default page;
