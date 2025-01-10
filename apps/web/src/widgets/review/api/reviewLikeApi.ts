export const reviewLike = async (
  reviewId: number,
  accessToken: string, // 액세스 토큰을 매개변수로 추가
): Promise<any> => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reviews/${reviewId}/like`, options);

    if (!response.ok) {
      throw new Error('리뷰 작성에 실패했습니다.');
    }

    return await response.json();
  } catch (e) {
    throw new Error('Failed to create review: ' + (e instanceof Error ? e.message : 'Unknown error'));
  }
};
