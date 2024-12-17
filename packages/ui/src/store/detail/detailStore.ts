import { create } from 'zustand';

interface ItemCardData {
  id: number;
  img: string;
  location: string;
  title: string;
  day: string;
  deadLine: number;
  isCount: boolean;
}

interface ReviewData {
  id: number;
  rating: number;
  date: string;
  images: string[];
  username: string;
  comment: string;
  likes: number;
}

interface DetailStore {
  recommandData: Array<ItemCardData>;
  setRecommandData: (data: Array<ItemCardData>) => void;

  selectedTab: string;
  setSelectedTab: (tab: string) => void;

  selectedValue: string;
  setSelectedValue: (value: string) => void;

  reviewData: Array<ReviewData>;
  setReviewData: (data: Array<ReviewData>) => void;
}

export const useDetailStore = create<DetailStore>(set => ({
  recommandData: [],
  setRecommandData: data => set({ recommandData: data }),

  selectedTab: 'a',
  setSelectedTab: tab => set({ selectedTab: tab }),

  selectedValue: 'visit',
  setSelectedValue: value => set({ selectedValue: value }),

  reviewData: [],
  setReviewData: data => set({ reviewData: data }),
}));
