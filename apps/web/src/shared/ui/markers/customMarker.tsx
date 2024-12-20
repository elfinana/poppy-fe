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
      size: new naver.maps.Size(50, 50), // 마커 크기
      scaledSize: new naver.maps.Size(36, 36), // 크기 비율 유지
    },
  });

  const infoWindow = new naver.maps.InfoWindow({
    content: `<div style="padding:10px;">${name}</div>`,
  });

  naver.maps.Event.addListener(marker, 'click', () => {
    onMarkerClick();
  });

  return marker;
};
