import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge, twMerge } from 'tailwind-merge';

const customMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['h1', 'h2', 'h3', 'h4', 'b1', 'b2', 'b3', 'b3_com', 'b4', 'b5', 'c1', 'c2', 'c3'] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customMerge(clsx(inputs));
}

export function formatWithThousandsSeparator(number: number) {
  // 입력값이 숫자인지 확인
  if (isNaN(number)) {
    return '유효한 숫자를 입력해주세요.';
  }

  // 숫자를 문자열로 변환하고 정규식을 사용해 3자리마다 점 추가
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
