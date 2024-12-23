'use client';
import { ArrowRight, book, CheckActive, CheckIcon } from '@/public';
import { CheckboxButton, PrimaryButton, RadioGroupItem, SecondaryButton } from '@/src/shared';
import { ChevronHeader } from '@/src/widgets';
import { RadioGroup } from '@radix-ui/react-radio-group';
import Image from 'next/image';
import React from 'react';
import { TossIcon } from '@/public';
import { useRouter } from 'next/navigation';
import { formatWithThousandsSeparator } from '@/src/shared/lib/utils';
import { bookData, security, storeData, userData } from './const';

const CheckoutPage = () => {
  const router = useRouter();
  const [checked, setChecked] = React.useState({
    0: false,
    1: false,
  });
  const consentFormHandler = () => {};
  const paymentButtonClickHandler = () => {
    router.push('/detail/book/completed');
  };

  return (
    <div className="flex flex-col items-center h-full">
      <ChevronHeader title="결제하기" edit={false} />
      <div className="p-16 pb-[24px] w-full">
        <span className="block mb-20 text-gray-900 text-h2">예약자 정보</span>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-gray-900 text-h3">{userData.name}</span>
            <span className="text-gray-600 text-b3">{userData.phoneNumber}</span>
          </div>
          <SecondaryButton variant="default" size={'sm'}>
            수정하기
          </SecondaryButton>
        </div>
      </div>
      <div className="w-full h-2 bg-gray-50" />

      <div className="px-16 pt-[20px] pb-[24px] w-full flex flex-col gap-[12px]">
        <span className="text-gray-900 text-h2">예약 상품</span>
        <div className="rounded-12 border-[1px] border-gray-200 py-16 pl-12 pr-[42px]">
          <div className="flex justify-between items-center w-full">
            <Image className="border rounded-4 min-w-[104px]" src={book} alt="book" width={104} height={104} />

            <div className="my-[10px] ml-12">
              <span className="block mb-8 text-gray-900 text-h4">{storeData.name}</span>
              <div className="flex flex-col gap-4 leading-[16px]">
                <div className="min-w-[173px]">
                  <span className="mr-8 text-gray-400 text-b5">일정</span>
                  <span className="text-gray-700 text-b5">{bookData.date}</span>
                </div>
                <div>
                  <span className="mr-8 text-gray-400 text-b5">인원</span>
                  <span className="text-gray-700 text-b5">{bookData.people}명</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-2 bg-gray-50" />
      <div className="flex flex-col gap-5 pt-[20px] pb-[24px] pl-16 w-full">
        <span className="text-gray-900 text-h2">결제 수단</span>
        <div className="flex flex-col gap-12">
          <RadioGroup className="flex flex-col gap-12">
            <div className="flex gap-8">
              <RadioGroupItem value="prop2" size="lg" checked />
              <div className="flex gap-2 items-center">
                <TossIcon />
                <span className="text-gray-800 text-b1">토스페이</span>
              </div>
            </div>
            <div className="flex gap-8 items-center">
              <RadioGroupItem value="prop3" size="lg" />
              <span className="text-gray-800 text-b1">현장에서 결제</span>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="w-full h-2 bg-gray-50" />

      <div className="flex flex-col gap-5 pt-[20px] pb-[24px] px-16 w-full">
        <div className="flex justify-between">
          <span className="text-gray-900 text-h2">결제 금액</span>
          <span className="text-blue-700 text-h2">{formatWithThousandsSeparator(bookData.cost + security)}원</span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <span className="text-gray-600 text-b3">상품 금액</span>
            <span className="text-gray-600 text-b3">{formatWithThousandsSeparator(bookData.cost)}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 text-b3">보증금</span>
            <span className="text-gray-600 text-b3">{formatWithThousandsSeparator(security)}원</span>
          </div>
        </div>
      </div>

      <div className="w-full h-2 bg-gray-50" />

      <div className="flex flex-col gap-[18px] pt-[20px] w-full px-16">
        <div className="flex gap-8 items-center">
          <CheckboxButton />
          <span className="text-gray-900 text-h4">예약 내용 확인 및 결제 동의</span>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex justify-between cursor-pointer" onClick={consentFormHandler}>
            <div className="flex gap-4 items-center">
              <CheckIcon />
              <span className="text-gray-400 text-b5">(필수) 개인정보 수집 · 이용 동의</span>
            </div>
            <ArrowRight />
          </div>
          <div className="flex justify-between cursor-pointer" onClick={consentFormHandler}>
            <div className="flex gap-4 items-center">
              <CheckIcon />
              <span className="text-gray-400 text-b5">(필수) 개인정보 수집 · 이용 동의</span>
            </div>
            <ArrowRight />
          </div>
          <div className="border-b-[1px] border-gray-100 w-full mt-[24px]" />
        </div>
      </div>
      <p className="border-b-[1px] border-gray-100 w-full mx-16 text-c2 text-gray-300 px-16 pt-12 flex justify-center text-center pb-[24px]">
        판매자가 등록한 상품정보, 품질 및 거래에 대한 책임은 각 판매자에게
        <br />
        있으며, 개별 판매자의 상품에 대하여 POPPY는 통신판매중개자로서
        <br />
        통신판매의 당사자가 아닙니다.
      </p>
      <div className="px-16 py-8 w-full">
        <PrimaryButton variant="disabled" onClick={paymentButtonClickHandler}>
          {formatWithThousandsSeparator(bookData.cost + security)}원 결제하기
        </PrimaryButton>
      </div>
    </div>
  );
};

export default CheckoutPage;
