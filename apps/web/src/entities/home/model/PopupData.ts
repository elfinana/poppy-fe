export interface PopupListResponse {
  code: number;
  message: string;
  data: Array<PopupData>;
}

export interface PopupDetailResponse {
  code: number;
  message: string;
  data: PopupData;
}

export interface PopupData {
  id: number;
  name: string;
  location: string;
  address: string;
  startDate: string;
  endDate: string;
  openingTime: Time;
  closingTime: Time;
  availableSlot: number;
  isActive: boolean;
  isEnd: boolean;
  rating: number;
  categoryName: string;
  reservationType: string;
  thumbnail: string;
  price: number;
  isAlmostFull: boolean;
}

export interface Time {
  hour: number;
  minute: number;
}
