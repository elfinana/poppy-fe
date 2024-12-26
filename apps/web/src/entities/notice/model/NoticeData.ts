export interface NoticeListItem {
  id: number;
  type: string;
  title: string;
  date: string;
  time: string;
}

export interface NoticeDetail {
  id: number;
  type: string;
  title: string;
  date: string;
  time: string;
  content: string;
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
