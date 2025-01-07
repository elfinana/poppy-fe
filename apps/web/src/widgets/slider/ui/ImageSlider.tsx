'use client';

import React from 'react';
import Image from "next/legacy/image";

type ImageSliderProps = {
  images: string[]; // 슬라이더에 표시할 이미지들의 URL 배열
  height?: string; // 이미지의 고정 높이 (기본값 제공)
  width?: string; // 이미지의 고정 너비 (기본값 제공)
};

export const ImageSlider = ({ images, height = '168px', width = '144px' }: ImageSliderProps) => {
  return (
    <div className="flex overflow-x-auto gap-4 scrollbar-hide px-4 mt-8">
      {images.map((img, idx) => (
        <div
          key={`SLIDER_IMAGE_${idx}`}
          className="flex-shrink-0"
          style={{
            width: width,
            height: height,
          }}>
          <Image
            src={img}
            alt={`Slider Image ${idx}`}
            width={150}
            height={150}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};
