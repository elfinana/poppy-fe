export const fetchNamePopupStores = async (name: string) => {
  const response = await fetch(`http://pop-py.duckdns.org/popup-stores/${name}`, {
    method: 'GET',
  });

  const data = await response.json();
  return data.data;
};
