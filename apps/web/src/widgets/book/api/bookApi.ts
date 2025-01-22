import { PopupListItem } from '../../home';
import { BookData, ReservationData, ReservationTotalData, WaitingData } from '../model/bookData';

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

export const getPopupDetail = async (id: number): Promise<PopupListItem> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/popup-stores/detail/${id}`);
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

export const postReservation = async (bookData: BookData, token: string) => {
  if (!bookData.time || !bookData.date) return;
  const requestBody = {
    popupStoreId: bookData.popupStoreId,
    date: bookData.date,
    time: convertTimeFormat(bookData.time),
    person: bookData.person,
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reservation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    return result;
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

export const successPayment = async (
  orderId: string,
  amount: string,
  paymentKey: string,
  token: string,
): Promise<BookData> => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/payments/success?orderId=${orderId}&paymentKey=${paymentKey}&amount=${amount}`,
      options,
    );
    const result = await response.json();
    if (result && result.data) return result.data;

    throw new Error('Response does not contain a data field');
  } catch (e) {
    console.error('Reservation error:', e);
    throw e;
  }
};

export const getReservationDetail = async (reservationId: string, accessToken: string): Promise<ReservationData> => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };

  try {
    if (!accessToken) throw new Error('accessToken is empty');
    if (!reservationId) throw new Error('reservationId is empty');

    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/users/reservations/${reservationId}`, options);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getReservation = async (accessToken: string): Promise<ReservationTotalData[]> => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    if (!accessToken) throw new Error('AccessToken is empty');

    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/users/reservations`, options);
    const result = await response.json();

    console.log('API Response:', result);

    if (result && Array.isArray(result.data)) {
      return result.data; // 배열로 반환
    }

    throw new Error('Response does not contain a valid data array');
  } catch (e) {
    console.error('Fetch Error:', e);
    throw new Error('Failed to fetch data');
  }
};

//예약취소
export const cancelReservation = async (
  reservationId: string,
  accessToken: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    if (!reservationId) throw new Error('Reservation ID is empty');
    if (!accessToken) throw new Error('AccessToken is empty');

    const reservationResponse = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/users/reservations/${reservationId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!reservationResponse.ok) {
      const errorData = await reservationResponse.json();
      throw new Error(`Failed to cancel reservation: ${errorData.message || 'Unknown error'}`);
    }

    const responseData = await reservationResponse.json();

    if (responseData.code === 200) {
      console.log(`Reservation ${reservationId} successfully canceled`);
      return { success: true, message: responseData.message };
    }

    throw new Error(`Unexpected response: ${responseData.message || 'Unknown error'}`);
  } catch (e) {
    console.error('Cancel Reservation Error:', e);
    throw new Error('Failed to cancel reservation');
  }
};

//대기 조회
export const getWaiting = async (userId: string, accessToken: string): Promise<WaitingData[]> => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    if (!accessToken) throw new Error('AccessToken is empty');
    if (!userId) throw new Error('UserId is empty');

    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/users/${userId}/waiting`, options);

    const result = await response.json();

    if (result && Array.isArray(result.data)) {
      return result.data; // 배열로 반환
    }

    throw new Error('Response does not contain a valid data array');
  } catch (e) {
    throw new Error('Failed to fetch waiting list');
  }
};

//대기 상세 조회
export const getWaitingDetail = async (
  userId: string,
  waitingId: string,
  accessToken: string,
): Promise<WaitingData> => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    if (!accessToken) throw new Error('AccessToken is empty');
    if (!userId || !waitingId) throw new Error('Missing userId or waitingId');

    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/users/${userId}/waiting/${waitingId}`, options);

    const result = await response.json();

    console.log('API Response:', result);

    if (result && result.data) {
      return result.data as WaitingData; // 단일 객체 반환
    }

    throw new Error('Response does not contain valid data');
  } catch (e) {
    console.error('Fetch Error:', e);
    throw new Error('Failed to fetch waiting detail');
  }
};

//대기 취소
export const cancelWaiting = async (
  userId: string,
  waitingId: string,
  storeId: string,
  accessToken: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    if (!userId) throw new Error('userId is empty');
    if (!accessToken) throw new Error('AccessToken is empty');

    const reservationResponse = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/users/${userId}/waiting/${waitingId}?storeId=${storeId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!reservationResponse.ok) {
      const errorData = await reservationResponse.json();
      throw new Error(`Failed to cancel reservation: ${errorData.message || 'Unknown error'}`);
    }

    const responseData = await reservationResponse.json();

    if (responseData.code === 200) {
      console.log(`Reservation ${userId} successfully canceled`);
      return { success: true, message: responseData.message };
    }

    throw new Error(`Unexpected response: ${responseData.message || 'Unknown error'}`);
  } catch (e) {
    console.error('Cancel Reservation Error:', e);
    throw new Error('Failed to cancel reservation');
  }
};
