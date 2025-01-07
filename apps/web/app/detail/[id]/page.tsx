'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  getDateDifference,
  IconButton,
  LikeIconButton,
  PrimaryButton,
  SecondaryXSButton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/shared';
import { useRef, useEffect, useState, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { useDetailStore } from 'store/detail/detailStore';
import { useQuery } from 'react-query';
import BookSheet from '@/src/widgets/book/BookSheet';
import { fetchPopupStoreDetail } from '../api/popupstoreDetailApi';
import AddressMap from '@/app/map/addressMap';
import { formatDay } from '@/src/shared/lib/dateUtils';
import { Sort } from '@/public';
import { fetchReviews } from '../api/reviewApi';

export default function Page() {
  const router = useRouter();

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

  const { id } = useParams(); // URL에서 id 가져오기

  // React Query로 팝업스토어상세세 데이터를 가져오기
  const { data, error, isLoading } = useQuery(['popupStoreDetail', id], () => fetchPopupStoreDetail(Number(id)), {
    enabled: !!id, // id가 존재할 때만 API 호출
  });

  //리뷰데이터가져오기
  const {
    data: reviewData,
    error: reviewError,
    isLoading: reviewLoading,
  } = useQuery(['reviews', id], () => fetchReviews(Number(id), 'RECENT', 0, 10), {
    enabled: !!id, // id가 존재할 때만 API 호출
  });

  const title = recommandData.length > 0 ? recommandData[0].title : '유사한 팝업';

  const buttonHandle = () => {
    if (selectedTab === 'a') {
      toggleBottomSheet();
    } else {
      console.log('Navigating to /review/'); // 네비게이션 실행 확인
      router.push(`/review/`);
    }
  };

  const tabsA = [
    { value: 'a', label: '정보' },
    { value: 'b', label: `리뷰 ${reviewData?.content.length}` },
  ];

  {
    const today = new Date();
    const todayDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };

    const daysLeft = data?.endDate
      ? getDateDifference({ year: data.endDate.year, month: data.endDate.month, day: data.endDate.day }, todayDate)
      : null;

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
            {data?.thumbnailUrl && (
              <Image
                className="flex items-center w-full"
                width={375}
                height={400}
                src={data.thumbnailUrl}
                alt="info-img"
              />
            )}
            {/* description */}
            <div className="flex flex-col px-[16px] mb-[48px]">
              <div className="flex items-center my-[12px] w-[64px] h-[24px] rounded-4 ">
                <p className="text-blue-500 text-c1">종료 D-{daysLeft}</p>
              </div>

              <div className="flex flex-col gap-y-[8px]">
                <p className="text-black text-h1">{data?.name}</p>
                <div className="flex items-center">
                  <IconButton className={`ml-[2px]`} icon={'ic-star-active'} size={'smmd'} />
                  <p className="text-gray-900 text-b2 mr-[8px]">{data?.rating}</p>
                  <p className="text-gray-500 text-b3_com">방문자 리뷰 {reviewData?.content.length}</p>
                </div>
              </div>

              <hr className="mt-[20px] mb-[12px]" />

              <div className="flex flex-col gap-y-[2px]">
                <div className="flex gap-x-[8px] h-[24px] items-center">
                  <IconButton icon={'ic-info-date'} size={'sm'} />
                  {data && (
                    <p className="text-gray-800 text-b3_com">
                      {formatDay({
                        year: data.startDate.year,
                        month: data.startDate.month,
                        day: data.startDate.day,
                      })}{' '}
                      ~{' '}
                      {formatDay({
                        year: data.endDate.year,
                        month: data.endDate.month,
                        day: data.endDate.day,
                      })}
                    </p>
                  )}
                </div>
                <div className="flex gap-x-[8px] h-[24px] items-center">
                  <IconButton icon={'ic-info-time'} size={'sm'} />
                  <p className="text-gray-800 text-b3_com">
                    {data?.isActive ? '영업 중' : '영업 종료'} · 매일{' '}
                    {data?.openingTime?.hour?.toString().padStart(2, '0')}:
                    {data?.openingTime?.minute?.toString().padStart(2, '0')} -{' '}
                    {data?.closingTime?.hour?.toString().padStart(2, '0')}:
                    {data?.closingTime?.minute?.toString().padStart(2, '0')}
                  </p>
                </div>
                <div className="flex gap-x-[8px] h-[24px] items-center">
                  <IconButton icon={'ic-info-location'} size={'sm'} />
                  <p className="text-gray-800 text-b3_com">{data?.address}</p>
                </div>
                <div className="flex gap-x-[8px] h-[24px] items-center">
                  <IconButton icon={'ic-info-ticket'} size={'sm'} />
                  <p className="text-gray-800 text-b3_com"> {data?.price?.toLocaleString()} </p>
                </div>
                <div className="flex gap-x-[8px] h-[24px] items-center">
                  <IconButton icon={'ic-info-share'} size={'sm'} />
                  {data?.homepageUrl ? (
                    <SecondaryXSButton onClick={() => window.open(data.homepageUrl, '_blank')}>
                      공식 홈페이지
                    </SecondaryXSButton>
                  ) : (
                    ''
                  )}

                  {data?.instagramUrl ? (
                    <SecondaryXSButton onClick={() => window.open(data.homepageUrl, '_blank')}>
                      인스타그램
                    </SecondaryXSButton>
                  ) : (
                    ''
                  )}
                  {data?.blogUrl ? (
                    <SecondaryXSButton onClick={() => window.open(data.homepageUrl, '_blank')}>
                      블로그
                    </SecondaryXSButton>
                  ) : (
                    ''
                  )}
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

                        {data?.description && (
                          <div
                            className="mt-16 text-gray-800 text-b3"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                          />
                        )}
                      </div>

                      <hr className="mt-[40px] mb-[24px]" />

                      {/* map area */}
                      <div className="flex flex-col px-[16px] gap-y-[16px] mb-[70px]">
                        <span className="text-gray-900 text-h4">지도</span>
                        <div className="flex flex-col gap-y-[12px]">
                          {/* 지도 api 수정 */}

                          <AddressMap address={data?.address || ''} />
                          <div className="flex gap-x-[4px]">
                            <p ref={addressRef} className="text-gray-900 text-b3_com">
                              {data?.address}
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
                        <span className="text-gray-900 text-h2">
                          리뷰 <span className="text-gray-300 ml-[4px]">{reviewData?.content.length}</span>
                        </span>
                        <button className="flex items-center gap-x-[4px]" type="button" onClick={() => {}}>
                          <Sort />
                          <span className="text-gray-500 text-b2">최근 등록순</span>
                        </button>
                      </div>

                      {selectedValue === 'visit' && (
                        <div className="flex flex-col gap-y-[20px]">
                          <div className="mt-[24px]  px-[16px]"></div>

                          <div className="flex flex-col gap-y-[52px]">
                            {reviewData?.content?.map(review => (
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
                                {review.imageUrls && review.imageUrls.length > 0 && (
                                  <div className="pl-[16px]">
                                    <div className="flex gap-x-[2px] overflow-auto">
                                      {review.imageUrls.map((imageSrc, index) => (
                                        <Image
                                          key={index}
                                          width={160}
                                          height={160}
                                          src={imageSrc}
                                          alt={`리뷰 이미지 ${index}`}
                                          className="w-[160px] h-[160px] object-cover"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Comment */}
                                <div className="text-b3 px-[16px]">
                                  <span className="text-gray-900">{review.userName} &nbsp;</span>
                                  <span className="text-gray-800">{review.content}</span>
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

          {
            <footer className="sticky w-full bottom-0 py-[8px] bg-white flex px-[8px] h-[64px] gap-x-[12px] items-center ">
              <div className="flex items-center flex-col gap-x-[4px]">
                <IconButton className={``} icon={'ic-bookmark'} size={'md'} onClick={() => {}} />
                <p className="text-gray-400 text-c1">50</p>
              </div>
              <PrimaryButton variant={'enabled'} onClick={buttonHandle}>
                {selectedTab === 'a' ? '예약하기' : '리뷰 남기기'}
              </PrimaryButton>
              <BookSheet isBottomSheetOpen={isBottomSheetOpen} setIsBottomSheetOpen={setIsBottomSheetOpen} />
            </footer>
          }
        </div>
      </div>
    );
  }
}
