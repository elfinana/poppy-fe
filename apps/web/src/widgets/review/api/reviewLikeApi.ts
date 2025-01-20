interface ReviewLikeResponse {
  code: number; // 요청 성공 여부
  message: string; // 성공 또는 실패 메시지
  data: {
    likeCount: number; // 좋아요 개수
    liked: boolean; // 좋아요 여부
  };
}

export const reviewLike = async (
  reviewId: number,
  accessToken: string, // 액세스 토큰을 매개변수로 추가
): Promise<ReviewLikeResponse> => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reviews/${reviewId}/like`, options);

    if (!response.ok) {
      throw new Error('좋아요 요청 실패');
    }

    const result = await response.json();

    // API 응답 형식이 예상과 다르면 오류 처리
    if (
      !result ||
      typeof result.code !== 'number' ||
      typeof result.data !== 'object' ||
      typeof result.data.liked !== 'boolean' ||
      typeof result.data.likeCount !== 'number'
    ) {
      throw new Error('응답 데이터 형식이 잘못되었습니다.');
    }
    return result;
  } catch (e) {
    throw new Error('좋아요 요청 실패: ' + (e instanceof Error ? e.message : 'Unknown error'));
  }
};
