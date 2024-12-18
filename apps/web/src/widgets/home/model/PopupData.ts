export interface PopupCarouselResponse extends Error {
  message: string;
  data?: Array<PopupCarouselItem>;
}

export interface PopupCarouselItem {
  id: number;
  number: string;
  thumbnail: string;
  title?: string;
  message?: string;
}

export interface Error {
  code: number;
  httpStatus?: string;
  errorMessage?: string;
}
