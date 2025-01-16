export interface BookDetail {
  popupStoreId: number;
  popupStoreName: string;
  address: string;
  userId: number;
  date: string;
  time: string;
  userNickname: string;
  phoneNumber: string;
  paymentMethod: string;
  status: string;
  amount: number;
  paidAmount: number;
  person: number;
}

export const fetchBookDetail = async (reservationId: number, accessToken: string): Promise<BookDetail> => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };
  const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/users/reservations/${reservationId}`, options);
  if (!response.ok) {
    throw new Error('예약 내역을 가져올 수 없습니다.');
  }
  const result = await response.json();
  return result.data;
};
