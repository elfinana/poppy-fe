'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SubHeader } from '@/src/widgets';
import { Input, PrimaryButton } from '@/src/shared';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { patchNickName } from '@/src/widgets/login';
import { useLoginStore, useNickNameCheck, useUserInfo } from 'store/login/loginStore';

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setToken, setRefreshToken, token, refreshToken } = useLoginStore();
  const { setNickNameCheck } = useNickNameCheck();
  const { setUserInfo } = useUserInfo();

  const code = searchParams.get('code') || '';

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const mutation = useMutation((inputValue: string) => patchNickName(inputValue, code), {
    onSuccess: res => {
      if (res.result.data.accessToken) {
        setToken(res.result.data.accessToken);
        setRefreshToken(res.result.data.refreshToken);
        setUserInfo({
          userId: res.data.userId,
          userEmail: res.data.userEmail,
          userNickname: res.data.nickname,
        });
        router.push('/home');
      }
    },
    onError: error => {
      setNickNameCheck(true);
    },
  });

  // 네이버 로그인 이벤트
  const handleButtonClick = () => {
    mutation.mutate(inputValue); // 닉네임 변경 요청 실행
  };

  // Input의 value가 변경될 때 호출되는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center w-full h-full px-[16px]">
      {/* header logo */}
      <SubHeader label="회원가입" />
      {/* input area */}
      <div className="flex flex-col justify-between w-full h-full">
        {/* nickname area */}
        <div className="flex flex-col pt-[80px] gap-y-[20px]">
          <label className="text-gray-900 text-h1">사용하실 닉네임을 알려주세요.</label>
          <Input label="닉네임" onChange={handleInputChange} ref={inputRef} />
        </div>

        <div className="py-[8px]">
          <PrimaryButton variant={'enabled'} onClick={handleButtonClick}>
            시작하기
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
