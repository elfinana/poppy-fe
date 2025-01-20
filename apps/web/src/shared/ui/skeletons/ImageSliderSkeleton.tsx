import React from 'react';
import { Skeleton } from '../skeleton';

type ImageSliderSkeletonProps = {
  count?: number; // 스켈레톤 개수
  height?: string; // 이미지의 고정 높이
  width?: string; // 이미지의 고정 너비
};

export const ImageSliderSkeleton = ({ count = 3, height = '168px', width = '144px' }: ImageSliderSkeletonProps) => {
  return (
    <div className="flex gap-4 px-4 overflow-x-auto scrollbar-hide">
      {Array.from({ length: count }).map((_, idx) => (
        <Skeleton
          key={`SLIDER_SKELETON_${idx}`}
          className="flex-shrink-0 rounded-lg"
          style={{
            width: width,
            height: height,
          }}
        />
      ))}
    </div>
  );
};
