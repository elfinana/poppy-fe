'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');
  console.log({ paymentKey, orderId, amount });

  return <div>success</div>;
};

export default PaymentSuccess;
