export interface PopupStoreDetail {
  id: number;
  name: string;
  description: string;
  location: string;
  address: string;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  openingTime: {
    hour: number;
    minute: number;
  };
  closingTime: {
    hour: number;
    minute: number;
  };
  availableSlot: number;
  isActive: boolean;
  isEnd: boolean;
  rating: number;
  categoryName: string;
  reservationType: string;
  thumbnailUrl: string;
  imageUrls: string[];
  price: number;
  homepageUrl: string;
  instagramUrl: string;
  blogUrl: string;
  scrapCount: number;
  isAlmostFull: boolean;
  viewCount: number;
}

export const fetchPopupStoreDetail = async (id: number): Promise<PopupStoreDetail> => {
  const response = await fetch(`http://pop-py.duckdns.org/popup-stores/detail/${id}`);
  if (!response.ok) {
    throw new Error('팝업스토어를 찾을 수 없습니다.');
  }
  const result = await response.json();
  return result.data;
};
