'use client';

import * as React from 'react';
import { BottomNavigation } from '@/src/widgets';
import Script from 'next/script';
import {
  CategoryIconButton,
  DropdownButton,
  FilterIconButton,
  FocusIconButton,
  IconButton,
  Input,
  SecondaryButton,
} from '@/src/shared';
import { MapSearchButton } from '@/src/shared/ui/buttons/MapSearchButton';
import { PinFashion } from '@/public';
import { createCustomMarker } from '@/src/shared/ui/markers/customMarker';

type Props = {};

const Page = (props: Props) => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapInstance = React.useRef<naver.maps.Map | null>(null);

  React.useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;

      mapInstance.current = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(37.5665, 126.978), // 서울시청 좌표
        zoom: 13, // 초기 줌 레벨
      });
    };

    if (window.naver && window.naver.maps) {
      initMap();
    }
  }, []);

  const handleFocusButtonClick = () => {
    if (!navigator.geolocation) {
      alert('현재 위치를 가져올 수 없습니다.');
      return;
    }
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      if (mapInstance.current) {
        mapInstance.current.setCenter(new naver.maps.LatLng(latitude, longitude));

        // 현재 위치에 마커 추가
        new naver.maps.Marker({
          position: new naver.maps.LatLng(latitude, longitude),
          map: mapInstance.current,
        });
      }
    });
  };

  //이 위치에서 검색
  const handleMapSearch = async () => {
    // 예시 데이터 (실제 API 응답 형식을 시뮬레이션)
    const mockData = [
      { id: 1, name: '팝업스토어 A', category: 'fashion', lat: 37.5705, lng: 126.982 },
      { id: 2, name: '팝업스토어 B', category: 'food', lat: 37.5663, lng: 126.9784 },
      { id: 3, name: '팝업스토어 C', category: 'goods', lat: 37.563, lng: 126.975 },
    ];

    mockData.forEach(store => {
      createCustomMarker({
        map: mapInstance.current!,
        lat: store.lat,
        lng: store.lng,
        category: store.category,
        name: store.name,
      });
    });
  };
  return (
    <div className="relative h-screen flex flex-col">
      {/* <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=tiv3ffuyzr`}
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('네이버 지도 API 스크립트가 로드되었습니다.');
        }}
      /> */}

      <div ref={mapRef} className="flex-grow"></div>

      <div className="absolute flex-col top-[38px] left-0 w-full px-16 z-10 flex items-center gap-2 ">
        <Input variantType="search" placeholder="팜업스토어명 검색" className="flex-grow" />
        <div className="flex gap-2 justify-start w-full">
          <FilterIconButton variant="inactive" />
          <DropdownButton value="날짜" variant="inactive" />
          <DropdownButton value="위치" variant="inactive" />
          <DropdownButton value="평점" variant="inactive" />
          <DropdownButton value="카테고리" variant="inactive" />
        </div>
      </div>

      <div className="absolute bottom-[100px] left-3">
        <FocusIconButton variant="inactive" onClick={handleFocusButtonClick} />
      </div>

      <div className="absolute bottom-[100px] left-1/2 transform -translate-x-1/2">
        <MapSearchButton onClick={handleMapSearch}>이 지역에서 검색</MapSearchButton>
      </div>
      <div className="fixed bottom-0 w-full z-20">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Page;
