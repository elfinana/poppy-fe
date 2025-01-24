import { PopupListItem } from '@/src/widgets';
import { PopupStoreDetail } from './popupstoreDetailApi';

export const fetchPopupStoreSimilar = async (id: number, accessToken?: string): Promise<Array<PopupListItem>> => {
  const options: RequestInit = {
    method: 'GET',
    headers: accessToken
      ? {
          Authorization: 'Bearer ' + accessToken,
        }
      : undefined,
  };
  const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/popup-stores/detail/${id}/similar`, options);
  if (!response.ok) {
    throw new Error('팝업스토어를 찾을 수 없습니다.');
  }
  const result = await response.json();
  return result.data;
};
