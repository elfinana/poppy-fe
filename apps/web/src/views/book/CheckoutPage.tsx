'use client';
import { ArrowRight, book, CheckActive, CheckIcon } from '@/public';
import { CheckboxButton, Hr, PrimaryButton, RadioGroupItem, SecondaryButton, Skeleton } from '@/src/shared';
import { ChevronHeader } from '@/src/widgets';
import { RadioGroup } from '@radix-ui/react-radio-group';
import Image from 'next/legacy/image';
import React from 'react';
import { TossIcon } from '@/public';
import { useSearchParams } from 'next/navigation';
import { formatWithThousandsSeparator } from '@/src/shared/lib/utils';
import { useQuery } from 'react-query';
import { fetchPopupStoreDetail } from '@/src/widgets/detail/api/popupstoreDetailApi';
import { useLoginStore, useUserInfo } from 'store/login/loginStore';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { toast } from '@/src/shared/hooks/use-toast';

const CheckoutPage = () => {
  const searchParams = useSearchParams();

  const orderId = searchParams.get('orderId');
  if (!orderId || orderId === 'undefined') throw Error('orderId is empty');

  const popupId = searchParams.get('popupId');
  if (!popupId || popupId === 'undefined') throw Error('popupId is empty');

  const person = searchParams.get('person');
  if (!person || person === 'undefined') throw Error('person is empty');

  const date = searchParams.get('date');
  if (!date || date === 'undefined') throw Error('date is empty');

  const login = React.useRef(true);

  const { token } = useLoginStore();

  const { userInfoData } = useUserInfo();
  if (!userInfoData) throw Error('userInfo is empty');

  const [paymentMethod, setPaymentMethod] = React.useState<string>('토스페이');
  const [checked, setChecked] = React.useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
    2: false,
  });

  const { data, error, isLoading } = useQuery(['book_fetchPopupStoreDetail', popupId], () =>
    fetchPopupStoreDetail(Number(popupId)),
  );

  const checkboxButtonClickHandler = (index: number) => {
    if (index === 0) {
      setChecked({
        0: !checked[0],
        1: !checked[0],
        2: !checked[0],
      });
    } else {
      setChecked(prev => {
        const newState = {
          ...prev,
          [index]: !prev[index],
        };
        if (newState[1] && newState[2]) {
          newState[0] = true;
        } else newState[0] = false;
        return newState;
      });
    }
  };

  const variantHandler = () => {
    if (checked[0] && checked[1] && checked[2] && login) {
      return 'enabled';
    }
    return 'disabled';
  };

  const paymentHandler = async () => {
    if (data) {
      if (paymentMethod === '토스페이') {
        // const ck = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
        const ck = 'test_ck_GjLJoQ1aVZ1Bk7A0vRa53w6KYe2R';
        if (!ck) throw Error('Invalid Client Key');

        loadTossPayments(ck).then(tossPayments => {
          tossPayments.requestPayment('토스결제', {
            amount: data.price * Number(person),
            currency: 'KRW',
            orderId: orderId,
            orderName: 'POPPY 테스트',
            customerName: userInfoData.userNickname,
            customerEmail: userInfoData.userEmail,
            successUrl: `${window.location.origin}/detail/${popupId}/book/paymentProcess/`,
            failUrl: `${window.location.origin}/detail/${popupId}/book/failed`,
          });
        });
      }
    }
  };

  const paymentButtonClickHandler = async () => {
    if (!token) {
      toast({
        variant: 'destructive',
        title: '로그인 만료',
        description: '로그인 세션이 만료되었습니다. 다시 로그인 해주세요.',
      });

      return;
    }

    if (variantHandler() === 'enabled') {
      await paymentHandler();
    }
  };

  return (
    <div className="flex flex-col items-center h-full">
      <ChevronHeader title="결제하기" edit={false} />
      <div className="p-16 pb-[24px] w-full">
        <span className="block mb-20 text-gray-900 text-h2">예약자 정보</span>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-gray-900 text-h3">{userInfoData.userNickname}</span>
            <span className="text-gray-600 text-b3">{userInfoData.userEmail}</span>
          </div>
          <SecondaryButton variant="default" size={'sm'}>
            수정하기
          </SecondaryButton>
        </div>
      </div>
      <Hr variant="bold" className="w-full" />
      <div className="px-16 pt-[20px] pb-[24px] w-full flex flex-col gap-[12px]">
        <span className="text-gray-900 text-h2">예약 상품</span>
        <div className="rounded-12 border-[1px] border-gray-200 py-16 pl-12 pr-[42px]">
          <div className="flex items-center w-full gap-12">
            {isLoading ? (
              <Skeleton className="w-[104px] h-[104px] border rounded-4" />
            ) : (
              data && (
                <Image
                  className="border rounded-4 min-w-[104px]"
                  src={data.thumbnailUrl}
                  alt="book"
                  width={104}
                  height={104}
                />
              )
            )}

            <div className="my-[10px]">
              {isLoading ? (
                <Skeleton className="h-[20px] w-full mb-8" />
              ) : (
                data && <span className="block mb-8 text-gray-900 text-h4">{data.name}</span>
              )}
              {isLoading ? (
                <Skeleton className="h-[38px] w-full" />
              ) : (
                data && (
                  <div className="flex flex-col gap-4 leading-[16px]">
                    <div className="min-w-[173px]">
                      <span className="mr-8 text-gray-400 text-b5">일정</span>
                      <span className="text-gray-700 text-b5">{date}</span>
                    </div>
                    <div>
                      <span className="mr-8 text-gray-400 text-b5">인원</span>
                      <span className="text-gray-700 text-b5">{person}명</span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <Hr variant="bold" className="w-full" />
      <div className="flex flex-col gap-5 pt-[20px] pb-[24px] pl-16 w-full">
        <span className="text-gray-900 text-h2">결제 수단</span>
        <div className="flex flex-col gap-12">
          <RadioGroup
            className="flex flex-col gap-12"
            defaultValue="토스페이"
            onValueChange={value => setPaymentMethod(value)}>
            <div className="flex gap-8">
              <RadioGroupItem value="토스페이" size="lg" id="토스페이" />
              <div className="flex items-center gap-2">
                <TossIcon />
                <label className="text-gray-800 text-b1" htmlFor="토스페이">
                  토스페이
                </label>
              </div>
            </div>
            {/* <div className="flex items-center gap-8">
              <RadioGroupItem value="현장에서 결제" size="lg" id="현장에서 결제" />
              <label className="text-gray-800 text-b1" htmlFor="현장에서 결제">
                현장에서 결제
              </label>
            </div> */}
          </RadioGroup>
        </div>
      </div>
      <Hr variant="bold" className="w-full" />
      <div className="flex flex-col gap-5 pt-[20px] pb-[24px] px-16 w-full">
        <div className="flex justify-between">
          <span className="text-gray-900 text-h2">결제 금액</span>
          {isLoading ? (
            <span className="h-24">
              <Skeleton className="h-[17px] w-[120px]" />
            </span>
          ) : (
            data && (
              <span className="text-blue-700 text-h2">
                {formatWithThousandsSeparator(data.price * Number(person))}원
              </span>
            )
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <span className="text-gray-600 text-b3">상품 금액</span>
            {isLoading ? (
              <span className="h-20">
                <Skeleton className="h-[14] w-[100px]" />
              </span>
            ) : (
              data && (
                <span className="text-gray-600 text-b3">
                  {formatWithThousandsSeparator(data.price * Number(person))}원
                </span>
              )
            )}
          </div>
          {/* <div className="flex justify-between">
            <span className="text-gray-600 text-b3">보증금</span>
            <span className="text-gray-600 text-b3">{formatWithThousandsSeparator(security)}원</span>
          </div> */}
        </div>
      </div>
      <Hr variant="bold" className="w-full" />
      <div className="flex flex-col gap-[18px] pt-[20px] w-full px-16">
        <div className="flex items-center gap-8">
          <CheckboxButton onClick={() => checkboxButtonClickHandler(0)} checked={checked[0]} />
          <span className="text-gray-900 text-h4">예약 내용 확인 및 결제 동의</span>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex justify-between cursor-pointer" onClick={() => checkboxButtonClickHandler(1)}>
            <div className="flex items-center gap-4">
              {checked[1] ? <CheckActive /> : <CheckIcon />}
              <span className="text-gray-400 text-b5">(필수) 개인정보 수집 · 이용 동의</span>
            </div>
            <ArrowRight />
          </div>
          <div className="flex justify-between cursor-pointer" onClick={() => checkboxButtonClickHandler(2)}>
            <div className="flex items-center gap-4">
              {checked[2] ? <CheckActive /> : <CheckIcon />}
              <span className="text-gray-400 text-b5">(필수) 개인정보 제3자 제공 동의</span>
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
      <div className="sticky bottom-0 w-full px-16 py-8">
        <PrimaryButton variant={variantHandler()} onClick={paymentButtonClickHandler}>
          {isLoading ? '로딩중...' : data && `${formatWithThousandsSeparator(data.price * Number(person))}원 결제하기`}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default CheckoutPage;
