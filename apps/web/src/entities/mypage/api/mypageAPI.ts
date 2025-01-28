import { PopupListItem } from '@/src/widgets';

const options = {
  method: 'POST',
  headers: {
    Authorization: `${process.env.TEST_ACCESS_TOKEN}`,
  },
};

const deleteOptions = {
  method: 'DELETE',
  headers: {
    Authorization: `${process.env.TEST_ACCESS_TOKEN}`,
  },
};

export const getScrapList = async (
  sortType: 'RECENT_SAVED' | 'OPEN_DATE' | 'END_DATE',
): Promise<Array<PopupListItem>> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/scraps?sortType=${sortType}`, options);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

// 닉네임 변경
export const changeNickName = async (id: string, newNickname: string, token: string): Promise<boolean> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/user/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname: newNickname }),
    });

    const result = await res.json();

    if (result.code === 200) {
      return true;
    }

    // Handle API error case
    throw new Error(result.errorMessage || 'An unknown error occurred.');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// 회원탈퇴
export const deleteUser = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/users/bye`, deleteOptions);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};
