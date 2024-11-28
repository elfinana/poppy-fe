import { Plan } from '@/public';
import { PrimaryButton, SecondaryButton, SecondaryXSButton } from '@/src/shared';
import React from 'react';

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div style={{ padding: '4px' }}>
        <PrimaryButton>예약하기</PrimaryButton>
      </div>
      <div style={{ padding: '4px' }}>
        <PrimaryButton variant="disabled">예약하기</PrimaryButton>
      </div>
      <div style={{ padding: '4px' }}>
        <SecondaryButton>초기화</SecondaryButton>
      </div>
      <div style={{ padding: '4px' }}>
        <SecondaryButton variant="disabled">초기화</SecondaryButton>
      </div>
      <div style={{ padding: '4px' }}>
        <SecondaryButton size="sm">수정하기</SecondaryButton>
      </div>
      <div style={{ padding: '4px' }}>
        <SecondaryButton variant="disabled" size="sm">
          수정하기
        </SecondaryButton>
      </div>
      <div style={{ padding: '4px' }}>
        <SecondaryXSButton>공식 홈페이지</SecondaryXSButton>
      </div>
      <div style={{ padding: '4px' }}>
        <SecondaryXSButton variant="disabled">공식 홈페이지</SecondaryXSButton>
      </div>
    </div>
  );
};

export default page;
