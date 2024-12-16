'use client';

import * as React from 'react';
import { BottomNavigation } from '@/src/widgets';
import {
  CategoryIconButton,
  DatePicker,
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
import { BottomSheet, BottomSheetHeader } from '@/src/shared/ui/bottomsheet';
import { BottomSheetTrigger, BottomSheetContent } from '@/src/shared/ui/bottomsheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared';

const tabsB = [
  { value: 'c', label: '날짜', content: '날짜' },
  { value: 'd', label: '위치', content: '위치' },
  { value: 'e', label: '평점', content: '평점' },
  { value: 'f', label: '카테고리', content: '카테고리' },
];

type Props = {};

const Page = (props: Props) => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapInstance = React.useRef<naver.maps.Map | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = React.useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(prev => !prev);
  };

  React.useEffect(() => {
    // 스크립트 로드
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=tiv3ffuyzr`;
    script.async = true;

    script.onload = () => {
      if (window.naver && window.naver.maps) {
        if (!mapRef.current) return;

        mapInstance.current = new window.naver.maps.Map(mapRef.current, {
          center: new window.naver.maps.LatLng(37.5665, 126.978),
          zoom: 13,
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleFocusButtonClick = () => {
    if (!navigator.geolocation) {
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
      <div ref={mapRef} className="flex-grow"></div>
      <div className="absolute flex-col top-[38px] left-0 w-full px-16 z-10 flex items-center gap-2 ">
        <Input variantType="search" placeholder="팜업스토어명 검색" className="flex-grow" />
        <div className="flex gap-2 justify-start w-full">
          <FilterIconButton variant="inactive" onClick={toggleBottomSheet} />
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

      {/* 바텀시트 */}
      <BottomSheet open={isBottomSheetOpen} onOpenChange={setIsBottomSheetOpen}>
        <BottomSheetContent>
          {/* Tabs는 BottomSheetContent 내부로 이동 */}
          <Tabs defaultValue="c" className="w-full">
            <BottomSheetHeader>
              <TabsList>
                {tabsB.map(tab => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </BottomSheetHeader>
            {tabsB.map(tab => (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.value === 'c' && (
                  <div className="mt-6">
                    <DatePicker />
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </BottomSheetContent>
      </BottomSheet>

      <div className="fixed bottom-0 w-full z-20">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Page;
