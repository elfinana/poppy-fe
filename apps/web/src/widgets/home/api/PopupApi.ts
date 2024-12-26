import { PopupCarouselItem, PopupCarouselResponse, PopupListItem } from '../model/';

export const getClosingSoonList = async (): Promise<Array<PopupListItem>> => {
  try {
    const response = await fetch(`http://pop-py.duckdns.org/popup-stores`);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getPopularList = async (): Promise<Array<PopupListItem>> => {
  try {
    const response = await fetch(`http://pop-py.duckdns.org/popup-stores/popular`);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getNewList = async (): Promise<Array<PopupListItem>> => {
  try {
    const response = await fetch(`http://pop-py.duckdns.org/popup-stores/new`);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getHotCategoryList = async (categoryId: number): Promise<Array<PopupListItem>> => {
  try {
    const response = await fetch(`http://pop-py.duckdns.org/popup-stores/search?categoryIds=${categoryId}`);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getVisitedList = async (): Promise<Array<PopupListItem>> => {
  try {
    const response = await fetch(`http://pop-py.duckdns.org/popup-stores`);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getPlannedList = async (): Promise<Array<PopupListItem>> => {
  try {
    const response = await fetch(`http://pop-py.duckdns.org/popup-stores/future`);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getListByCategory = async (categoryId: string): Promise<Array<PopupListItem>> => {
  try {
    const response = await fetch(`http://pop-py.duckdns.org/popup-stores/search?categoryIds=${categoryId}`);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getListByName = async (keyword: string): Promise<Array<PopupListItem>> => {
  try {
    const response = await fetch(`http://pop-py.duckdns.org/popup-stores/${keyword}`);
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
