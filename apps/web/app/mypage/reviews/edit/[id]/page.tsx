import { ChevronHeader } from '@/src/widgets';
import React from 'react';
import Image from 'next/legacy/image';
import { Hr, IconButton, PrimaryButton, Textarea } from '@/src/shared';
import { Camera } from '@/public';

const Page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id = (await params).id;

  return (
    <div>
      <ChevronHeader title="리뷰 수정하기" edit={false} />
      <div className="flex px-16 mt-16 gap-x-12">
        <div>
          <Image
            width={64}
            height={64}
            src={'https://placehold.co/500/webp'}
            alt={`review-${id}`}
            className="object-cover rounded-4"
          />
        </div>
        <div className="flex flex-col gap-y-8">
          <div className="text-gray-900 text-h4">오둥이의 아르바이트</div>
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-8">
              <span className="text-gray-400 text-b5">일정</span>
              <span className="text-gray-700 text-b5">2024. 11. 18(월) 오후 1:30</span>
            </div>
            <div className="flex gap-x-8">
              <span className="text-gray-400 text-b5">인원</span>
              <span className="text-gray-700 text-b5">2명</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <Hr variant="hairline" />
      </div>
      <div className="px-16 mt-20 text-gray-900 text-h4">방문하신 팝업스토어, 어떠셨나요?</div>
      <div className="flex gap-4 px-16 mt-8">
        <div>
          <IconButton icon="ic-star" size="xlg" />
        </div>
        <div>
          <IconButton icon="ic-star" size="xlg" />
        </div>
        <div>
          <IconButton icon="ic-star" size="xlg" />
        </div>
        <div>
          <IconButton icon="ic-star" size="xlg" />
        </div>
        <div>
          <IconButton icon="ic-star" size="xlg" />
        </div>
      </div>
      <div className="px-16 mt-32 text-gray-900 text-h4">리뷰 작성</div>
      <div className="flex gap-8 px-16 mt-12 overflow-x-scroll">
        <div className="flex flex-col items-center justify-center flex-shrink-0 border border-gray-100 w-80 h-80 bg-gray-50 rounded-4 gap-y-4">
          <span>
            <Camera />
          </span>
          <span className="text-gray-400 text-c1">0 / 5</span>
        </div>
        {images.map((item, idx) => (
          <div key={`IMG_${idx}`} className="relative flex-shrink-0 w-80 h-80">
            <Image layout="fill" src={item} alt={`img-${idx}`} className="object-cover rounded-4" />
          </div>
        ))}
      </div>
      <div className="px-16 mt-12">
        <Textarea />
      </div>
      <div className="fixed bottom-0 z-50 flex items-center justify-center w-full px-16 py-8 bg-white">
        <PrimaryButton variant={'enabled'}>{'작성 완료'}</PrimaryButton>
      </div>
    </div>
  );
};

export default Page;

const images = [
  'https://placehold.co/500/webp',
  'https://placehold.co/500/webp',
  'https://placehold.co/500/webp',
  'https://placehold.co/500/webp',
  'https://placehold.co/500/webp',
];
