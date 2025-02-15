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
  /**@description 샤프롱 클릭 시 보여지는 화면에서 어떤 카테고리의 목록을 가져올 지 선택\
   * 1 = 패션·뷰티\
   * 2 = 음식\
   * 3 = 아트\
   * 4 = 굿즈\
   * 5 = 라이프\
   * 6 = 지금 많이 찾는 팝업\
   * 7 = 따끈따끈, 새로 오픈한 팝업\
   * 8 = 예전에 방문했던 팝업\
   * 9 = 오픈 예정인 팝업\
   * 10 = 지금 주목해야 할 OO 팝업\
   * 11 = 최근 본 팝업\
   * 101 = 저장한 팝업\
   * 102 = 작성한 리뷰
   */
  category?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 101 | 102;
  showArrow?: boolean;
};

export const Title = ({ count = 0, typography = 'h2', showArrow = true, ...props }: Props) => {
  const router = useRouter();

  const moreClickHandler = () => {
    if (!showArrow) return;
    if (props.category === 102) {
      router.push('/mypage/reviews');
    } else if (props.category === 101) {
      router.push('/mypage/saves');
    } else {
      router.push(`/home/more/${props.category}`);
    }
  };

  return (
    <div className="flex items-center justify-between w-full px-16" onClick={moreClickHandler}>
      <div className="flex items-center gap-4">
        {props.text1 ? <span className={`text-${typography} text-gray-900`}>{props.text1}</span> : null}
        {props.text2 ? <span className={`text-${typography} text-blue-700`}>{props.text2}</span> : null}
        {props.text3 ? <span className={`text-${typography} text-gray-900`}>{props.text3}</span> : null}
        {count > 0 ? <span className="text-gray-300 text-h4">{count}</span> : null}
      </div>
      {showArrow && (
        <div>
          <ArrowRightSmall />
        </div>
      )}
    </div>
  );
};
