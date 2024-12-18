import { PopupCarouselResponse } from '../model/';

export const getClosingSoonList = async (): Promise<PopupCarouselResponse> => {
  try {
    const response = await fetch('');
    const result = <PopupCarouselResponse>await response.json();

    return result;
  } catch (e) {
    return { code: 0, message: 'Unable to fetch data' };
  }
};
