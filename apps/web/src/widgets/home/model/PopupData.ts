export interface PopupCarouselResponse extends Error {
  message: string;
  data?: Array<PopupCarouselItem>;
}

export interface PopupCarouselItem {
  img: string;
  location: string;
  day: string;
  deadLine: number;
  isCount: boolean;
  id: number;
  number: string;
  thumbnail: string;
  title: string;
  message: string;
}

export interface PopupList extends Error {
  message: string;
  data?: Array<PopupListItem>;
}

export interface PopupListItem {
  id: number;
  name: string;
  description: string;
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
  homepageUrl: string;
  instagramUrl: string;
  blogUrl: string;
  scrapCount: number;
  isAlmostFull: boolean;
}

export interface Error {
  code: number;
  httpStatus?: string;
  errorMessage?: string;
}
