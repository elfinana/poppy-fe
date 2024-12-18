import { PopupCarouselItem } from '../model/PopupData';

export const getClosingSoonList = async (): Promise<Array<PopupCarouselItem>> => {
  try {
    const response = await fetch('');
    const data: Array<PopupCarouselItem> = await response.json();

    return data;
  } catch (e) {}
};
