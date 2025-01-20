export interface BookData {
  date: string;
  time: string;
  price: number;
  address: string;
  orderId: string;

  popupStoreId?: number;
  popupStoreName: string;
  userId?: number;
  thumbnail: string;
  status?: string;
  person: number;

  reservationId: number;
}

export interface ReservationData {
  popupStoreId: number;
  popupStoreName: string;
  address: string;
  userId: number;
  date: string;
  time: string;
  userNickname: string;
  phoneNumber: number;
  paymentMethod: string;
  status: string;
  amount: number;
  paidAmount: number;
  person: number;
}

export interface ReservationTotalData {
  userId: string;
  popupStoreId: number;
  popupStoreName: string;
  reservationDate: string;
  reservationTime: string;
  location: string;
  status: string;
  thumbnail: string;
  person: number;
}
