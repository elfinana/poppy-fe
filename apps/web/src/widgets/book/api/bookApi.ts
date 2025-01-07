import { BookData } from '../model/bookData';

const BASE_URL = 'http://pop-py.duckdns.org';
type UserData = {
  id: number;
  name: string;
  phoneNumber: string;
};

export const getToken = async () => {
  try {
    const response = await fetch(`${BASE_URL}/test/token/4`, {
      method: 'GET',
      headers: {},
    });
    return response.text();
  } catch (e) {
    console.error(e);
    throw e;
  }
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

export const postReservation = async (bookData: BookData) => {
  if (!bookData.time || !bookData.date) return;
  const requestBody = {
    popupStoreId: bookData.popupStoreId,
    date: bookData.date,
    time: convertTimeFormat(bookData.time),
    person: bookData.person,
  };
  const token = await getToken();
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

export const successPayment = async (orderId: string, amount: string, paymentKey: string): Promise<BookData> => {
  const token = await getToken();
  console.log(token);
  try {
    const response = await fetch(`${BASE_URL}/success?orderId=${orderId}&paymentKey=${paymentKey}&amount=${amount}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result.data;
  } catch (e) {
    console.error('Reservation error:', e);
    throw e;
  }
};
