import { FilterParams } from '@/app/search/model/searchData';

export const fetchFilteredPopupStores = async (filters: FilterParams) => {
  const { date, locations, rating, categoryIds } = filters;

  const queryParams = new URLSearchParams({
    date: date || '',
    locations: locations?.join(',') || '',
    rating: rating ? String(rating) : '',
    categoryIds: categoryIds?.join(',') || '',
  }).toString();

  const response = await fetch(`http://pop-py.duckdns.org/popup-stores/search?${queryParams}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch filtered popup stores: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data || !data.data) {
    throw new Error('Response does not contain valid data');
  }

  return data.data; // 검색된 팝업스토어 데이터 반환
};
