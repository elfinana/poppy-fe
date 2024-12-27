import * as React from 'react';

// 카테고리별 마커 아이콘 매핑
const categoryIcons: { [key: string]: string } = {
  fashion: '/icons/PinFashion.svg', // 아이콘 경로를 직접 명시
  art: '/icons/PinArt.svg',
  food: '/icons/PinFood.svg',
  goods: '/icons/PinGoods.svg',
  life: '/icons/PinLife.svg',
};
export interface CustomMarkerProps {
  map: naver.maps.Map;
  lat: number;
  lng: number;
  category: keyof typeof categoryIcons; // 카테고리 타입
  name: string; // 팝업스토어 이름
  onMarkerClick: () => void;
}

export const createCustomMarker = ({ map, lat, lng, category, name, onMarkerClick }: CustomMarkerProps) => {
  const iconUrl = categoryIcons[category];

  const marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(lat, lng),
    map,
    icon: {
      url: iconUrl, // 마커에 사용할 아이콘 URL
      size: new naver.maps.Size(60, 60), // 마커 크기
      // anchor: new naver.maps.Point(18, 18),
    },
  });

  naver.maps.Event.addListener(marker, 'click', () => {
    onMarkerClick();
  });

  return marker;
};
