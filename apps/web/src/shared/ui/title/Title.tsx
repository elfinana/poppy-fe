'use client';

import { ArrowRightSmall } from '@/public';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  /**@description 첫 번째 문구(강조 문구 없을 시 이것만 사용) */
  text1?: string;
  /**@description 두 번째 파란색 문구(강조할 시 사용) */
  text2?: string;
  /**@description 세 번째 검은색 문구 */
  text3?: string;
  /**@description 제목 오른쪽에 목록 개수를 표시 */
  count?: number;
  /**@description 제목 타이포그래피 설정 */
  typography?: 'h2' | 'h3';
  /**@description 샤프롱 클릭 시 보여지는 화면에서 어떤 카테고리의 목록을 가져올 지 선택 */
  category: string;
};

export const Title = ({ count = 0, typography = 'h2', ...props }: Props) => {
  const router = useRouter();

  const moreClickHandler = () => {
    if (props.category === 'reviews') {
      router.push('/mypage/reviews');
    } else if (props.category === 'saves') {
      router.push('/mypage/saves');
    } else {
      router.push(`/home/more/${props.category}`);
    }
  };

  return (
    <div className="flex w-full justify-between items-center px-16" onClick={moreClickHandler}>
      <div className="flex items-center gap-4">
        {props.text1 ? <span className={`text-${typography} text-gray-900`}>{props.text1}</span> : null}
        {props.text2 ? <span className={`text-${typography} text-blue-700`}>{props.text2}</span> : null}
        {props.text3 ? <span className={`text-${typography} text-gray-900`}>{props.text3}</span> : null}
        {count > 0 ? <span className="text-h4 text-gray-300">{count}</span> : null}
      </div>
      <div>
        <ArrowRightSmall />
      </div>
    </div>
  );
};
