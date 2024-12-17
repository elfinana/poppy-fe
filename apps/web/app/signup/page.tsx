'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SubHeader } from '@/src/widgets';
import { Input, PrimaryButton } from '@/src/shared';
import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const data = {
    nickName: 'test',
  };

  // 네이버 로그인 이벤트
  const handleButtonClick = () => {
    router.push('signup');
  };

  // Input의 value가 변경될 때 호출되는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 버튼 활성화 조건
  const isButtonEnabled = inputValue.length > 0 && inputValue !== data.nickName && inputValue.length < 11;

  return (
    <div className="flex flex-col items-center w-full h-full px-[16px]">
      {/* header logo */}
      <SubHeader label="회원가입" />
      {/* input area */}
      <div className="flex flex-col justify-between w-full h-full">
        {/* nickname area */}
        <div className="flex flex-col pt-[80px] gap-y-[20px]">
          <label className="text-gray-900 text-h1">사용하실 닉네임을 알려주세요.</label>
          <Input label="닉네임" existingName={data.nickName} onChange={handleInputChange} ref={inputRef} />
        </div>

        <div className="py-[8px]">
          <PrimaryButton variant={isButtonEnabled ? 'enabled' : 'disabled'} onClick={handleButtonClick}>
            시작하기
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
