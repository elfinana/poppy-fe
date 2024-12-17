// Zustand에서 상태를 정의하고 관리하기 위한 핵심 함수
import { create } from 'zustand';

// 상태 인터페이스 정의
interface ItemCardData {
  id: number;
  img: string;
  location: string;
  title: string;
  day: string;
  deadLine: number;
  isCount: boolean;
}

// Zustand 스토어의 상태 구조와 메서드를 정의
interface RecommandStore {
  // ItemCardData 객체를 여러 개 저장하는 배열
  // 상태 초기값은 빈 배열
  recommandData: Array<ItemCardData>;

  // 새로운 추천 데이터를 배열로 받아와 recommandData 상태를 업데이트하는 함수
  setRecommandData: (data: Array<ItemCardData>) => void;
}

// Zustand 스토어 생성
// create<RecommandStore> :  Zustand의 create 함수에 RecommandStore 인터페이스를 제네릭으로 전달.
export const useRecommandStore = create<RecommandStore>(set => ({
  // recommandData: 초기값은 빈 배열
  recommandData: [],

  // data라는 인자를 받아 recommandData 상태를 새로운 값으로 업데이트
  // set 함수는 상태를 업데이트할 때 사용
  setRecommandData: data => set({ recommandData: data }),
}));
