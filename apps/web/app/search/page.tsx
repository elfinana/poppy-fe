'use client';

import * as React from 'react';
import { BottomNavigation } from '@/src/widgets';
import { DropdownButton, FilterIconButton, FocusIconButton, IconButton, Input, MapSearchButton } from '@/src/shared';

import { createCustomMarker } from '@/src/shared/ui/markers/customMarker';
import MarkerInfoSheet from '@/src/shared/ui/bottomsheet/markerInfoSheet';
import FilterSheet from '@/src/shared/ui/bottomsheet/filterSheet';

type Props = {};

const Page = (props: Props) => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapInstance = React.useRef<naver.maps.Map | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = React.useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string>('c');
  const [selectedMarkerData, setSelectedMarkerData] = React.useState({
    title: '',
    date: '',
    description: '',
  });

  const toggleFilterSheet = (tab: string) => {
    setActiveTab(tab);
    setIsFilterSheetOpen(prev => !prev);
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
        onMarkerClick: () => {
          // 클릭 시 바텀시트 데이터 설정 및 열기
          setSelectedMarkerData({
            title: store.name,
            date: '2024.11.22 - 2024.12.04',
            description: `${store.name}의 상세 설명입니다.`,
            // images: ['/images/example1.jpg', '/images/example2.jpg'], // 이미지 예시
          });
          setIsBottomSheetOpen(true);
        },
      });
    });
  };
  return (
    <div className="relative h-screen flex flex-col">
      <div ref={mapRef} className="flex-grow"></div>
      <div className="absolute flex-col top-[38px] left-0 w-full px-16 z-10 flex items-center gap-2 ">
        <Input variantType="search" placeholder="팜업스토어명 검색" className="flex-grow" />
        <div className="flex gap-2 justify-start w-full">
          <FilterIconButton variant="inactive" onClick={() => toggleFilterSheet('c')} />
          <DropdownButton value="날짜" variant="inactive" onClick={() => toggleFilterSheet('c')} />
          <DropdownButton value="위치" variant="inactive" onClick={() => toggleFilterSheet('d')} />
          <DropdownButton value="평점" variant="inactive" onClick={() => toggleFilterSheet('e')} />
          <DropdownButton value="카테고리" variant="inactive" onClick={() => toggleFilterSheet('f')} />
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

      <FilterSheet isOpen={isFilterSheetOpen} onClose={() => setIsFilterSheetOpen(false)} activeTab={activeTab} />
      <MarkerInfoSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        markerData={selectedMarkerData}
      />
    </div>
  );
};

export default Page;
