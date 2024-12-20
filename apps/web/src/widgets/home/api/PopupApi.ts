import { PopupCarouselItem, PopupCarouselResponse } from '../model/';

export const getClosingSoonList = async (): Promise<Array<PopupCarouselItem>> => {
  try {
    return await fetch(`https://my-json-server.typicode.com/typicode/demo/posts`).then(res => res.json());
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getPopularList = async (): Promise<Array<PopupCarouselItem>> => {
  try {
    return await fetch(`https://my-json-server.typicode.com/typicode/demo/posts`).then(res => res.json());
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getNewList = async (): Promise<Array<PopupCarouselItem>> => {
  try {
    return await fetch(`https://my-json-server.typicode.com/typicode/demo/posts`).then(res => res.json());
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getHotCategoryList = async (): Promise<Array<PopupCarouselItem>> => {
  try {
    return await fetch(`https://my-json-server.typicode.com/typicode/demo/posts`).then(res => res.json());
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getVisitedList = async (): Promise<Array<PopupCarouselItem>> => {
  try {
    return await fetch(`https://my-json-server.typicode.com/typicode/demo/posts`).then(res => res.json());
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getPlannedList = async (): Promise<Array<PopupCarouselItem>> => {
  try {
    return await fetch(`https://my-json-server.typicode.com/typicode/demo/posts`).then(res => res.json());
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};
