'use client';

import React from 'react';
import { successPayment } from '@/src/widgets/book/api/bookApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLoginStore } from 'store/login/loginStore';

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const { token } = useLoginStore();
  if (!token) throw Error('AccessToken is empty.');

  const searchParams = useSearchParams();

  const orderId = searchParams.get('orderId');
  if (!orderId) throw new Error('Invalid data in orderId');

  const paymentKey = searchParams.get('paymentKey');
  if (!paymentKey) throw new Error('Invalid data in paymentKey');

  const amount = searchParams.get('amount');
  if (!amount) throw new Error('Invalid data in amount');

  React.useEffect(() => {
    const response = successPayment(orderId, amount, paymentKey, token);

    response
      .then(data => {
        if (data.popupStoreId && data.reservationId) {
          router.push(
            `/detail/${data.popupStoreId}/book/completed?reservationId=${data.reservationId}&popupId=${data.popupStoreId}`,
          );
        } else {
          throw new Error('Invalid data in popupStoreId or reservationId');
        }
      })
      .catch(err => {
        alert(err);
      });
  }, []);

  return <div>processing...</div>;
};

export default Page;
