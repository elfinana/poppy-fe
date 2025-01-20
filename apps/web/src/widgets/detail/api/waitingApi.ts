import { WaitingRegisterData } from '../model/waitingData';

export const registerUserWaiting = async (storeId: number, accessToken: string): Promise<WaitingRegisterData> => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/waiting?storeId=${storeId}`, options);

  if (!response.ok) {
    throw new Error('Waiting registeration failed.');
  }

  return response.json();
};
