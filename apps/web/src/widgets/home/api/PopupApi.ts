import { PopupCarouselItem, PopupCarouselResponse, PopupListItem } from '../model/';

export const getClosingSoonList = async (): Promise<Array<PopupListItem>> => {
  try {
    const response = await fetch(`http://pop-py.duckdns.org/popup-stores`);
    const result = await response.json();

    // 'data' 필드가 있는 경우 반환
    if (result && result.data) {
      return result.data;
    }

    // 'data' 필드가 없으면 예외 처리
    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getPopularList = async (): Promise<Array<PopupListItem>> => {
  try {
    const response = await fetch(`http://pop-py.duckdns.org/popup-stores/popular`);
    const result = await response.json();

    // 'data' 필드가 있는 경우 반환
    if (result && result.data) {
      return result.data;
    }

    // 'data' 필드가 없으면 예외 처리
    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getNewList = async (): Promise<Array<PopupListItem>> => {
  try {
    const response = await fetch(`http://pop-py.duckdns.org/popup-stores/new`);
    const result = await response.json();

    // 'data' 필드가 있는 경우 반환
    if (result && result.data) {
      return result.data;
    }

    // 'data' 필드가 없으면 예외 처리
    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getHotCategoryList = async (categoryId: number): Promise<Array<PopupListItem>> => {
  try {
    const response = await fetch(`http://pop-py.duckdns.org/popup-stores/search?categoryIds=${categoryId}`);
    const result = await response.json();

    // 'data' 필드가 있는 경우 반환
    if (result && result.data) {
      return result.data;
    }

    // 'data' 필드가 없으면 예외 처리
    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getVisitedList = async (): Promise<Array<PopupListItem>> => {
  try {
    const response = await fetch(`http://pop-py.duckdns.org/popup-stores`);
    const result = await response.json();

    // 'data' 필드가 있는 경우 반환
    if (result && result.data) {
      return result.data;
    }

    // 'data' 필드가 없으면 예외 처리
    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getPlannedList = async (): Promise<Array<PopupListItem>> => {
  try {
    const response = await fetch(`http://pop-py.duckdns.org/popup-stores/future`);
    const result = await response.json();

    // 'data' 필드가 있는 경우 반환
    if (result && result.data) {
      return result.data;
    }

    // 'data' 필드가 없으면 예외 처리
    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getListByCategory = async (categoryId: string): Promise<Array<PopupListItem>> => {
  try {
    const response = await fetch(`http://pop-py.duckdns.org/popup-stores/search?categoryIds=${categoryId}`);
    const result = await response.json();

    // 'data' 필드가 있는 경우 반환
    if (result && result.data) {
      return result.data;
    }

    // 'data' 필드가 없으면 예외 처리
    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};
