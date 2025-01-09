'use client';

import { useRouter } from 'next/navigation';
import Image from "next/legacy/image";
import { getNewList, PopupSlider } from '@/src/widgets';
import {
  IconButton,
  LikeIconButton,
  PrimaryButton,
  RadioGroup,
  RadioGroupItem,
  SecondaryXSButton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Title,
} from '@/src/shared';
import Textfilter from '../../public/icons/ic-text-filter.svg';
import { useRef, useEffect, useState } from 'react';
import { useDetailStore } from 'store/detail/detailStore';
import { useQuery } from 'react-query';
import BookSheet from '@/src/widgets/book/BookSheet';

export default function Page() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(prev => !prev);
  };

  const { recommandData, setRecommandData, selectedTab, setSelectedTab, selectedValue, setSelectedValue } =
    useDetailStore();
  const addressRef = useRef<HTMLParagraphElement>(null);

  const handleCopy = () => {
    if (addressRef.current) {
      navigator.clipboard.writeText(addressRef.current.textContent || '');
      alert('주소가 복사되었습니다!');
    }
  };

  const router = useRouter();

  const { data, error, isLoading } = useQuery({
    queryKey: ['popupData'],
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/popup-stores/detail/1`).then(res => res.json()),
  });
  console.log(data);

  // 데이터 업데이트
  useEffect(() => {
    setRecommandData(backendData);
  }, [setRecommandData]);

  const backendData = [
    {
      id: 1,
      img: 'https://placehold.co/500/webp',
      location: '서울 영등포구',
      title: '골든볼 팝업스토어',
      day: '05.21(금) - 12.31(일)',
      deadLine: 40,
      isCount: true,
    },
    {
      id: 2,
      img: 'https://placehold.co/500/webp',
      location: '서울 성동구',
      title: '어노브 이터널 아우라 성수 팝업스토어',
      day: '11.08(금) - 11.24(일)',
      deadLine: 3,
      isCount: false,
    },
    {
      id: 3,
      img: 'https://placehold.co/500/webp',
      location: '서울 성동구',
      title: '어노브 이터널 아우라 성수 팝업스토어',
      day: '11.08(금) - 11.24(일)',
      deadLine: 3,
      isCount: true,
    },
    {
      id: 4,
      img: 'https://placehold.co/500/webp',
      location: '서울 성동구',
      title: '어노브 이터널 아우라 성수 팝업스토어',
      day: '11.08(금) - 11.24(일)',
      deadLine: 0,
      isCount: false,
    },
  ];

  const title = recommandData.length > 0 ? recommandData[0].title : '유사한 팝업';

  const buttonHandle = () => {
    if (selectedTab === 'a') {
      toggleBottomSheet();
    } else {
      router.push('/review');
    }
  };

  const tabsA = [
    { value: 'a', label: '정보' },
    { value: 'b', label: '리뷰 26' },
  ];

  const reviewData = [
    {
      id: 1,
      rating: 4.0,
      date: '24.10.19',
      images: [
        '/images/img-review-1.png',
        '/images/img-review-2.png',
        '/images/img-review-3.png',
        '/images/img-review-3.png',
      ],
      username: 'leechunsik',
      comment:
        '처음 방문해 봤는데 생각보다 만족스러웠어요. 공간 디자인도 깔끔하고, 제품 체험할 수 있는 부분이 특히 좋았어요. 다만 사람이 좀 많아서 한두 곳은 dsf 만족스러웠 만족스러',
      likes: 1,
    },
    {
      id: 2,
      rating: 4.0,
      date: '24.10.19',
      images: [
        '/images/img-review-1.png',
        '/images/img-review-2.png',
        '/images/img-review-3.png',
        '/images/img-review-3.png',
      ],
      username: 'leechunsik',
      comment:
        '처음 방문해 봤는데 생각보다 만족스러웠어요. 공간 디자인도 깔끔하고, 제품 체험할 수 있는 부분이 특히 좋았어요. 다만 사람이 좀 많아서 한두 곳은 dsf 만족스러웠 만족스러',
      likes: 1,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-between w-full h-full">
      {/* header  */}
      <header className="fixed flex w-full  px-[16px] justify-between h-[48px] items-center">
        <IconButton className={``} icon={'ic-back-white'} size={'md'} onClick={() => router.back()} />
        <IconButton className={``} icon={'ic-share'} size={'md'} onClick={() => {}} />
      </header>

      {/* content area */}
      <div className="flex flex-col w-full h-full">
        <section className="items-center overflow-auto">
          {/* img area */}
          <Image
            className="flex items-center w-full"
            width={375}
            height={400}
            src="/images/img-info-1.png"
            alt="info-img"
          />
          {/* description */}
          <div className="flex flex-col px-[16px] mb-[48px]">
            <div className="flex items-center my-[12px] w-[64px] h-[24px] rounded-4 ">
              <p className="text-blue-500 text-c1">종료 D-40</p>
            </div>

            <div className="flex flex-col gap-y-[8px]">
              <p className="text-black text-h1">오둥이의 아르바이트</p>
              <div className="flex items-center">
                <IconButton className={`ml-[2px]`} icon={'ic-star-active'} size={'smmd'} />
                <p className="text-gray-900 text-b2 mr-[8px]">4.5</p>
                <p className="text-gray-500 text-b3_com">방문자 리뷰 19 · 인스타 리뷰 7</p>
              </div>
            </div>

            <hr className="mt-[20px] mb-[12px]" />

            <div className="flex flex-col gap-y-[2px]">
              <div className="flex gap-x-[8px] h-[24px] items-center">
                <IconButton icon={'ic-info-date'} size={'sm'} />
                <p className="text-gray-800 text-b3_com">2024. 11. 01(금) - 2024. 11. 21(일)</p>
              </div>
              <div className="flex gap-x-[8px] h-[24px] items-center">
                <IconButton icon={'ic-info-time'} size={'sm'} />
                <p className="text-gray-800 text-b3_com">영업 중 · 매일 11:00 - 20:00</p>
              </div>
              <div className="flex gap-x-[8px] h-[24px] items-center">
                <IconButton icon={'ic-info-location'} size={'sm'} />
                <p className="text-gray-800 text-b3_com">서울 서초구 강남대로 465 지하1층 핫트랙스 강남점</p>
              </div>
              <div className="flex gap-x-[8px] h-[24px] items-center">
                <IconButton icon={'ic-info-ticket'} size={'sm'} />
                <p className="text-gray-800 text-b3_com">무료 입장</p>
              </div>
              <div className="flex gap-x-[8px] h-[24px] items-center">
                <IconButton icon={'ic-info-share'} size={'sm'} />
                <SecondaryXSButton>공식 홈페이지</SecondaryXSButton>
                <SecondaryXSButton>인스타그램</SecondaryXSButton>
              </div>
            </div>
          </div>

          {/* tab area */}
          <Tabs defaultValue="a" className="w-full" onValueChange={value => setSelectedTab(value)}>
            <TabsList>
              {tabsA.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabsA.map(tab => (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.value === 'a' && (
                  <div className="flex flex-col mb-[64px]">
                    <div className="pt-[24px] px-[18px]">
                      <p className="text-gray-900 text-h4">팝업스토어 소개</p>
                      <p className="text-gray-800 text-b3">
                        <br />
                        <br />
                        마침내 열심히 아르바이트를 하며 전국을 누비고 서울로 다시 돌아왔둥!
                        <br /> 오둥이의 마지막 아르바이트 팝업에서 만납시둥!
                        <br /> 이번 팝업 스토어에서 처음 선을 보이는 신상 오둥이 피규어(랜덤)도 만날 수 있습니둥!
                        <br />
                        <br /> &apos;오둥이의 아르바이트&apos; 팝업 안내 🧼
                        <br /> - 장소: 핫트랙스 강남점 지하 1층 오둥이 팝업스토어
                        <br />
                        - 날짜: 2024.11.01. (금) - 11.21. (목)
                        <br /> - 시간: 09:30 ~ 22:00 **핫트랙스 강남점 영업 시간과 동일 <br />
                        <br />
                        🫧 스페셜 굿즈 [오둥이 피규어] 출시!
                        <br />
                        <br /> 오둥이 마지막 아르바이트 기념 스페셜 굿즈 준비!
                        <br />
                        오둥이의 일상을 볼 수 있는 피규어 4종!
                        <br />
                        <br /> 👐🏻 스페셜 굿즈 [오둥이 피규어] 미리 만나기
                        <br /> 오둥이의 일상을 볼 수 있는 피규어 3종! 극소량 한정 사전 판매!!
                        <br /> 원하는 디자인 선택 가능✨
                        <br /> 현장에서 추가 공개되는 오둥이는 어떤 모습일까...?!
                        <br /> 스마트스토어 &quot;오늘의 귀여움샵&quot;에서 먼저 만나보세요
                        <br />
                        <br /> ✔판매 일시: 10/30 (수) 오후 2시
                        <br /> ✔판매처: 네이버스마트스토어 오늘의 귀여움샵
                        <br /> * 본 제품은 소량 판매며, 재고 소진시 판매 종료 될 수 있습니다.
                        <br /> * 팝업스토어에서는 &apos;랜덤&apos;으로 판매됩니다.   🎁 SPECIAL PROMOTION
                        <br /> - 3만원 이상 : 오둥이 띠부씰 3개(랜덤)
                        <br /> - 5만원 이상 : 오둥이 띠부씰 3개(랜덤) + PVC파우치(그린)
                        <br /> - 10만원 이상 : 오둥이 띠부씰 3개(랜덤) + 페이스쿠션_모찌
                        <br /> - 15만원 이상 : 오둥이 띠부씰 3개(랜덤) + 바디필로우
                        <br />
                        <br />
                        <br /> <span className="text-gray-900 text-h4">안내 및 주의사항</span>
                        <br />
                        <br /> *증정품은 재고 소진 시 종료될 수 있습니다.
                        <br /> *증정품은 중복 제공되지 않습니다.
                      </p>
                    </div>

                    <hr className="mt-[40px] mb-[24px]" />

                    {/* map area */}
                    <div className="flex flex-col px-[16px] gap-y-[16px] mb-[70px]">
                      <span className="text-gray-900 text-h4">지도</span>
                      <div className="flex flex-col gap-y-[12px]">
                        {/* 지도 api 수정 */}
                        <Image
                          className="w-full"
                          width={343}
                          height={208}
                          src="/images/img-info-map.png"
                          alt="map-img"
                        />
                        <div className="flex gap-x-[4px]">
                          <p ref={addressRef} className="text-gray-900 text-b3_com">
                            서울 서초구 강남대로 465 지하1층 핫트랙스 강남점
                          </p>
                          <IconButton icon={'ic-info-copy'} size={'sm'} onClick={handleCopy} />
                        </div>
                      </div>
                    </div>

                    {/* pop list */}
                    {/* <PopupSlider variant="list" text2={`${title}`} text3={'와 유사한 팝업'} data={recommandData} /> */}
                  </div>
                )}

                {tab.value === 'b' && (
                  <div className="flex flex-col mt-[16px] mb-[62px]">
                    <div className="flex items-center justify-between  px-[16px]">
                      <RadioGroup value={selectedValue} onValueChange={value => setSelectedValue(value)}>
                        <RadioGroupItem value="visit" size="sm" label="방문자 리뷰" />
                        <RadioGroupItem value="instar" size="sm" label="인스타그램 리뷰" />
                      </RadioGroup>
                      <button className="flex items-center gap-x-[4px]" type="button" onClick={() => {}}>
                        <Textfilter />
                        <span className="text-gray-500 text-b2">최근 등록순</span>
                      </button>
                    </div>

                    {selectedValue === 'visit' && (
                      <div className="flex flex-col gap-y-[20px]">
                        <div className="mt-[24px]  px-[16px]">
                          <span className="text-gray-900 text-h2">
                            방문자 리뷰 <span className="text-gray-300 ml-[4px]">7</span>
                          </span>
                        </div>

                        <div className="flex flex-col gap-y-[52px]">
                          {reviewData.map(review => (
                            <div key={review.id}>
                              {/* Rating and Date */}
                              <div className="flex items-center justify-between mb-[8px] px-[16px]">
                                <div className="flex items-center">
                                  <IconButton className="mr-[4px]" icon="ic-star-active" size="sm" />
                                  <p className="text-gray-900 text-h1">{review.rating.toFixed(1)}</p>
                                </div>
                                <p className="text-gray-300 text-b5">{review.date}</p>
                              </div>

                              {/* Image Section */}
                              <div className="pl-[16px]">
                                <div className="flex gap-x-[2px] overflow-auto">
                                  {review.images.map((imageSrc, index) => (
                                    <Image
                                      key={index}
                                      width={160}
                                      height={160}
                                      src={imageSrc}
                                      alt={`review-${index}`}
                                      className="w-[160px] h-[160px] object-cover"
                                    />
                                  ))}
                                </div>
                              </div>

                              {/* Comment */}
                              <div className="text-b3 px-[16px]">
                                <span className="text-gray-900">{review.username} &nbsp;</span>
                                <span className="text-gray-800">{review.comment}</span>
                              </div>

                              {/* Like Button */}
                              <div className="flex w-full justify-end mt-[4px] px-[16px]">
                                <LikeIconButton variant="inactive" value={review.likes} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedValue === 'instar' && (
                      <div className="flex flex-col gap-y-[20px]">
                        <div className="mt-[24px]  px-[16px]">
                          <span className="text-gray-900 text-h2">
                            인스타그램 리뷰 <span className="text-gray-300 ml-[4px]">7</span>
                          </span>
                        </div>

                        <div className="flex flex-col gap-y-[52px]">
                          {reviewData.map(review => (
                            <div key={review.id}>
                              {/* Rating and Date */}
                              <div className="flex items-center justify-between mb-[8px] px-[16px]">
                                <div className="flex items-center">
                                  <IconButton className="mr-[4px]" icon="ic-star-active" size="sm" />
                                  <p className="text-gray-900 text-h1">{review.rating.toFixed(1)}</p>
                                </div>
                                <p className="text-gray-300 text-b5">{review.date}</p>
                              </div>

                              {/* Image Section */}
                              <div className="pl-[16px]">
                                <div className="flex gap-x-[2px] overflow-auto">
                                  {review.images.map((imageSrc, index) => (
                                    <Image
                                      key={index}
                                      width={160}
                                      height={160}
                                      src={imageSrc}
                                      alt={`review-${index}`}
                                      className="w-[160px] h-[160px] object-cover"
                                    />
                                  ))}
                                </div>
                              </div>

                              {/* Comment */}
                              <div className="text-b3 px-[16px]">
                                <span className="text-gray-900">{review.username} &nbsp;</span>
                                <span className="text-gray-800">{review.comment}</span>
                              </div>

                              {/* Like Button */}
                              <div className="flex w-full justify-end mt-[4px] px-[16px]">
                                <LikeIconButton variant="inactive" value={review.likes} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div></div>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <footer className="sticky w-full bottom-0 py-[8px] bg-white flex px-[8px] h-[64px] gap-x-[12px] items-center ">
          <div className="flex items-center flex-col gap-x-[4px]">
            <IconButton className={``} icon={'ic-bookmark'} size={'md'} onClick={() => {}} />
            <p className="text-gray-400 text-c1">50</p>
          </div>
          <PrimaryButton variant={'enabled'} onClick={buttonHandle}>
            {selectedTab === 'a' ? '예약하기' : '리뷰하기'}
          </PrimaryButton>
          <BookSheet isBottomSheetOpen={isBottomSheetOpen} setIsBottomSheetOpen={setIsBottomSheetOpen} />
        </footer>
      </div>
    </div>
  );
}
