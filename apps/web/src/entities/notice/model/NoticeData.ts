export interface NoticeListItem {
  id: number;
  title: string;
  content: string;
  createdDate: string;
  createdTime: string;
}

export interface NoticeDetail {
  id: number;
  title: string;
  content: string;
  createdDate: string;
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
