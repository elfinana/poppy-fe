import { NoticeDetail, NoticeListItem } from '..';

export const getNotices = async (): Promise<Array<NoticeListItem>> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/notices`);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }

    if (result.code === 404) {
      return [];
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    console.log(e);
    throw new Error('Failed to fetch data');
  }
};

export const getNoticeDetail = async (id: string): Promise<NoticeDetail> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/notices/${id}`);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    console.log(e);
    throw new Error('Failed to fetch data');
  }
};
