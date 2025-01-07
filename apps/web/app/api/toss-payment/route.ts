import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { amount, orderId, orderName, popupId } = body;
  const TOSS_SECRET_KEY = 'test_sk_4yKeq5bgrp67jgMJ9qDx3GX0lzW6';

  try {
    const response = await fetch('https://api.tosspayments.com/v1/payments', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(TOSS_SECRET_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method: '간편결제',
        amount,
        orderId,
        orderName,
        successUrl: `http://localhost:3000/detail/${popupId}/book/completed`,
        failUrl: `http://localhost:3000/detail/${popupId}`,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error }, { status: 500 });
    }

    const result = await response.json();
    return NextResponse.json({ paymentUrl: result.checkout.url }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '결제 요청 중 오류 발생' }, { status: 500 });
  }
}
