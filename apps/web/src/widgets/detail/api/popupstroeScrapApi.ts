export const fetchScrap = async (storeId: number, accessToken: string): Promise<any> => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/scraps/${storeId}`, options);

  if (!response.ok) {
    throw new Error('스크랩 요청 실패');
  }

  return response.json();
};
