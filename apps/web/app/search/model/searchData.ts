export interface PopupStore {
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
  homepageUrl: string | null;
  instagramUrl: string | null;
  blogUrl: string | null;
  scrapCount: number;
  isAlmostFull: boolean;
}

export interface FilterParams {
  date?: string | null; // yyyy-MM-dd 형식
  locations?: string[] | null; // 지역 배열
  rating?: number | null; // 평점
  categoryIds?: number[] | null; // 카테고리 ID 배열
}
