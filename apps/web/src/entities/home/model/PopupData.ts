export interface PopupListData {
  code: number;
  message: string;
  data: Array<PopupData>;
}

export interface PopupData {
  id: number;
  name: string;
  location: string;
  address: string;
  startDate: string;
  endDate: string;
  openingTime: string;
  closingTime: string;
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
