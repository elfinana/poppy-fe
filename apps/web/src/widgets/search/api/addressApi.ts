export const fetchAddress = async (address: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/popup-stores/address/${encodeURIComponent(address)}`,
    {
      method: 'GET',
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch filtered popup stores: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data || !data.data) {
    throw new Error('Response does not contain valid data');
  }

  return data.data; // 검색된 팝업스토어 데이터 반환
};
