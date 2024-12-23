import { PopupCarouselItem, PopupCarouselResponse, PopupListItem } from '../model/';

export const getClosingSoonList = async (): Promise<Array<PopupListItem>> => {
  try {
    const response = await fetch(`http://pop-py.duckdns.org/popup-stores`);
    const result = await response.json();

    console.log(result.data);

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

export const getNewList = async (): Promise<Array<PopupListItem>> => {
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

export const getHotCategoryList = async (): Promise<Array<PopupListItem>> => {
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
