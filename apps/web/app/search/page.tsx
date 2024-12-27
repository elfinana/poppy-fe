'use client';

import * as React from 'react';
import { BottomNavigation } from '@/src/widgets';
import { DropdownButton, FilterIconButton, FocusIconButton, IconButton, Input, MapSearchButton } from '@/src/shared';

import { createCustomMarker } from '@/src/shared/ui/markers/customMarker';
import MarkerInfoSheet from '@/src/shared/ui/bottomsheet/markerInfoSheet';
import FilterSheet from '@/src/shared/ui/bottomsheet/filterSheet';
import { FilterParams } from './model/searchData';

type Props = {};

declare global {
  interface Window {
    initMap?: () => void;
  }
}

const Page = (props: Props) => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapInstance = React.useRef<naver.maps.Map | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = React.useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = React.useState(false);
  const [filterParams, setFilterParams] = React.useState<FilterParams | null>(null);
  const [isMapInitialized, setIsMapInitialized] = React.useState(false); // 지도 초기화 상태 추가
  const [activeTab, setActiveTab] = React.useState<string>('c');
  const [selectedMarkerData, setSelectedMarkerData] = React.useState<{
    title: string;
    date: string;
    description: string;
    images: string[]; // images 속성 추가
  }>({
    title: '',
    date: '',
    description: '',
    images: [], // 초기값으로 빈 배열 설정
  });
  const toggleFilterSheet = (tab: string) => {
    setActiveTab(tab);
    setIsFilterSheetOpen(prev => !prev);
  };

  React.useEffect(() => {
    // 스크립트 로드
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=tiv3ffuyzr&submodules=geocoder&callback=initMap`;
    script.async = true;

    window.initMap = () => {
      console.log('네이버 지도 API 로드 완료');
      if (!mapRef.current) return;

      const mapOptions = {
        center: new naver.maps.LatLng(37.5665, 126.978), // 초기 중심 좌표
        zoom: 13,
        logoControl: false,
        mapDataControl: false,
        scaleControl: false,
      };

      mapInstance.current = new naver.maps.Map(mapRef.current, mapOptions);
      console.log('지도 인스턴스 생성 완료:', mapInstance.current);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      window.initMap = undefined;
    };
  }, []);

  const searchCoordinateToAddress = (latlng: naver.maps.LatLng) => {
    if (!naver.maps.Service || !naver.maps.Service.reverseGeocode) {
      console.error('naver.maps.Service.reverseGeocode가 초기화되지 않았습니다.');
      return;
    }

    naver.maps.Service.reverseGeocode(
      {
        coords: latlng,
        orders: [naver.maps.Service.OrderType.ADDR, naver.maps.Service.OrderType.ROAD_ADDR].join(','),
      },
      (status, response) => {
        if (status === naver.maps.Service.Status.ERROR) {
          console.error('Reverse Geocoding 오류 발생');
          return;
        }

        const items = response.v2.results;
        if (!items || items.length === 0) {
          console.error('결과를 찾을 수 없습니다.');
          return;
        }

        const roadAddress = items.find((item: any) => item.name === 'roadaddr')?.region?.area2?.name;
        const jibunAddress = items.find((item: any) => item.name === 'addr')?.region?.area2?.name;

        console.log('도로명 주소:', roadAddress || '없음');
        console.log('지번 주소:', jibunAddress || '없음');
      },
    );
  };

  //이 위치에서 검색
  const handleMapSearch = () => {
    if (!mapInstance.current) {
      console.error('지도 인스턴스가 초기화되지 않았습니다.');
      return;
    }

    const center = mapInstance.current.getCenter(); // 현재 지도 중심 좌표 가져오기

    const latLng = new naver.maps.LatLng(center.y, center.x); // LatLng로 변환
    searchCoordinateToAddress(latLng); // Reverse Geocoding 호출
  };

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

  // 예시 데이터 (실제 API 응답 형식을 시뮬레이션)
  // const mockData = [
  //   { id: 1, name: '팝업스토어 A', category: 'fashion', lat: 37.5705, lng: 126.982 },
  //   { id: 2, name: '팝업스토어 B', category: 'food', lat: 37.5663, lng: 126.9784 },
  //   { id: 3, name: '팝업스토어 C', category: 'goods', lat: 37.563, lng: 126.975 },
  // ];

  // mockData.forEach(store => {
  //   createCustomMarker({
  //     map: mapInstance.current!,

  //     lat: store.lat,
  //     lng: store.lng,
  //     category: store.category,
  //     name: store.name,
  //     onMarkerClick: () => {
  //       // 클릭 시 바텀시트 데이터 설정 및 열기
  //       setSelectedMarkerData({
  //         title: store.name,
  //         date: '2024.11.22 - 2024.12.04',
  //         description: `${store.name}의 상세 설명입니다.`,
  //         images: ['https://placehold.co/500/webp', 'https://placehold.co/500/webp', 'https://placehold.co/500/webp'],
  //       });
  //       setIsBottomSheetOpen(true);
  //     },
  //   });
  // });

  return (
    <div className="relative flex flex-col h-screen">
      <div ref={mapRef} className="flex-grow"></div>
      <div className="absolute flex-col top-[38px] left-0 w-full px-16 z-10 flex items-center gap-2 ">
        <Input variantType="search" placeholder="팜업스토어명 검색" className="flex-grow" />
        <div className="flex justify-start w-full gap-2 mt-8">
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

      <div className="fixed bottom-0 z-20 w-full">
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
