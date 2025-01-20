export interface BookListItem {
  thumbnail: string;
  popupStoreName: string;
  reservationDate: string;
  reservationTime: string;
  location: string;
  person: number;
  status: 'CHECKED' | 'VISITED' | 'CANCELED';
  reservationId: number;
  popupStoreId: number;
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
