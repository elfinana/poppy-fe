export const fetchNamePopupStores = async (name: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/popup-stores/${name}`, {
    method: 'GET',
  });

  const data = await response.json();
  return data.data;
};
