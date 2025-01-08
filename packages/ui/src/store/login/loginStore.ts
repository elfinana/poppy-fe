import { create } from 'zustand';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

interface LoginState {
  token: string | undefined;
  refreshToken: string | undefined;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  clearToken: () => void;
}

export const useLoginStore = create<LoginState>(set => ({
  // 초기 값은 쿠키에서 가져옴
  token: typeof window !== 'undefined' ? (getCookie('token') as string) : undefined,
  refreshToken: typeof window !== 'undefined' ? (getCookie('refreshToken') as string) : undefined,
  // 토큰 저장
  setToken: token => {
    setCookie('token', token, { maxAge: 60 * 30 }); // 30 동안 유효
    set({ token });
  },
  setRefreshToken: refreshToken => {
    setCookie('refreshToken', refreshToken, { maxAge: 60 * 60 * 24 * 7 }); // 7일 동안 유효
    set({ refreshToken });
  },

  // 토큰 삭제
  clearToken: () => {
    deleteCookie('token'); // 쿠키 삭제
    set({ token: undefined });
  },
}));

// user 정보
interface userInfoData {
  userEmail: string;
  userNickname?: string;
}

interface useUserInfoStore {
  userInfoData: Array<userInfoData>;
  setUserInfo: (data: Array<userInfoData>) => void;
}

export const useUserInfo = create<useUserInfoStore>(set => ({
  userInfoData: [],
  setUserInfo: data => set({ userInfoData: data }),
}));

// nickName check

interface NickNameStore {
  nickNameCheck: boolean;
  setNickNameCheck: (data: boolean) => void;
}

export const useNickNameCheck = create<NickNameStore>(set => ({
  nickNameCheck: false,
  setNickNameCheck: data => set({ nickNameCheck: data }),
}));
