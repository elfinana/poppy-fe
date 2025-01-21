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
  reviewCnt: number;
  isScraped: boolean;
}

export const fetchPopupStoreDetail = async (id: number, accessToken?: string): Promise<PopupStoreDetail> => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };

  let response;

  if (accessToken) {
    response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/popup-stores/detail/${id}`, options);
  } else {
    response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/popup-stores/detail/${id}`);
  }

  if (!response.ok) {
    throw new Error('팝업스토어를 찾을 수 없습니다.');
  }

  const result = await response.json();

  return result.data;
};
