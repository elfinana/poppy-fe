import { create } from 'zustand';

interface ReviewStore {
  reviewCounts: { [key: string]: number }; // id에 따른 리뷰 개수 저장
  setReviewCount: (id: number, count: number) => void;
}

export const useReviewStore = create<ReviewStore>(set => ({
  reviewCounts: {}, // 초기 상태
  setReviewCount: (id, count) =>
    set(state => ({
      reviewCounts: { ...state.reviewCounts, [id]: count },
    })),
}));
