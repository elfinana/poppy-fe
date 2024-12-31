import { BookData } from '../model/bookData';

const BASE_URL = 'http://pop-py.duckdns.org';
type UserData = {
  id: number;
  name: string;
  phoneNumber: string;
};

export const getUserData = async (): Promise<UserData> => {
  try {
    const response = await fetch(`${BASE_URL}/user`);
    const result = await response.json();

    console.log(result.data);

    // 'data' 필드가 있는 경우 반환
    if (result && result.data) {
      return result.data;
    }

    // 'data' 필드가 없으면 예외 처리
    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getPopupDetail = async (id: number) => {
  try {
    const response = await fetch(`http://pop-py.duckdns.org/popup-stores/${id}`);
    const result = await response.json();

    // 'data' 필드가 있는 경우 반환
    if (result && result.data) {
      return result.data;
    }

    // 'data' 필드가 없면 예외 처리
    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

const token =
  'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJiMTc2YTFAZXhhbXBsZS5jb20iLCJ1c2VySWQiOjMsInVzZXJuYW1lIjoiYjE3NmExQGV4YW1wbGUuY29tIiwicm9sZSI6IlJPTEVfQURNSU4iLCJpYXQiOjE3MzU1NDkyODAsImV4cCI6MTczNTU1MTA4MH0.J5dAYvEv7zeMo1DJoO1SOv9LNWid6MymA8QVH_EyeHK3TSlyi1wmGxFR9bMEMnTJ';

export const postReservation = async (bookData: BookData) => {
  if (!bookData.time || !bookData.date) return;
  const requestBody = {
    popupStoreId: bookData.popupId,
    date: bookData.date,
    time: convertTimeFormat(bookData.time),
    person: bookData.people,
  };
  console.log(requestBody);
  try {
    const response = await fetch(`${BASE_URL}/reservation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    // 응답 상태 코드 확인
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return result.data || result;
  } catch (e) {
    console.error('Reservation error:', e);
    throw e;
  }
};

export const convertTimeFormat = (koreanTime: string): string => {
  // 정규식으로 '오전/오후', 시간, 분 추출
  const match = koreanTime.match(/([오전오후]+)\s*(\d+):(\d+)/);

  if (!match) {
    console.error('Invalid time format');
    return koreanTime;
  }

  const [, period, hours, minutes] = match;
  let hour = parseInt(hours, 10);

  // 오후인 경우 12를 더하고, 12시(정오)는 예외 처리
  if (period === '오후') {
    hour = hour === 12 ? 12 : hour + 12;
  }
  // 오전인 경우 12시(자정)는 0으로 변경
  else if (period === '오전' && hour === 12) {
    hour = 0;
  }

  // 두 자리 숫자로 포맷팅
  return `${hour.toString().padStart(2, '0')}:${minutes}`;
};

export const requestPayment = async (orderId: string) => {
  try {
    // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
    await paymentWidget?.requestPayment({
      orderId: orderId,
      orderName: '토스 티셔츠 외 2건',
      customerName: '김토스',
      customerEmail: 'customer123@gmail.com',
      customerMobilePhone: '01012341234',
      successUrl: `${window.location.origin}/success`,
      failUrl: `${window.location.origin}/fail`,
    });
  } catch (error) {
    // 에러 처리하기
    console.error(error);
  }
};
