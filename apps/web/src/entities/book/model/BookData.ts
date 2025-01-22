import { Interface } from 'readline/promises';

export interface BookListItem {
  popupStoreId: number;
  thumbnail: string;
  popupStoreName: string;
  reservationDate: string;
  reservationTime: string;
  address: string;
  person: number;
  status: 'CHECKED' | 'VISITED' | 'CANCELED';
  reservationId: number;
}

export interface ChipItem {
  id: number;
  label: string;
}

export interface ActivityListItem {
  userId: number;
  type: string;
  storeId: number;
  popupStoreName: string;
  waitingNumber: number;
  peopleAhead?: number | null;
  isRead: false;
  date?: string;
  message: string;
}
