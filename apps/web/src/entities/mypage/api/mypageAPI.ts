import { PopupListItem } from '@/src/widgets';

const options = {
  method: 'POST',
  headers: {
    Authorization: `${process.env.TEST_ACCESS_TOKEN}`,
  },
};

export const getScrapList = async (
  sortType: 'RECENT_SAVED' | 'OPEN_DATE' | 'END_DATE',
): Promise<Array<PopupListItem>> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/scraps?sortType=${sortType}`, options);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};
