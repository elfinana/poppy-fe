import React, { useEffect, useRef } from 'react';

type AddressMapProps = {
  address: string;
};

const AddressMap = ({ address }: AddressMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);

  useEffect(() => {
    if (!address) return;

    // 주소를 위도/경도로 변환 후 지도 중심 설정
    const searchAddressToCoordinate = (address: string, callback: (lat: number | null, lng: number | null) => void) => {
      if (!naver.maps.Service || !naver.maps.Service.geocode) {
        callback(null, null);
        return;
      }

      naver.maps.Service.geocode(
        {
          query: address,
        },
        (status, response) => {
          if (status !== naver.maps.Service.Status.OK) {
            console.error('Geocoding 오류:', status);
            callback(null, null);
            return;
          }

          const result = response.v2.addresses[0];
          if (!result) {
            console.error('주소 결과를 찾을 수 없습니다.');
            callback(null, null);
            return;
          }

          const lat = parseFloat(result.y); // 위도
          const lng = parseFloat(result.x); // 경도
          callback(lat, lng);
        },
      );
    };

    searchAddressToCoordinate(address, (lat, lng) => {
      if (lat !== null && lng !== null) {
        if (!mapRef.current) return;

        const mapOptions = {
          center: new naver.maps.LatLng(lat, lng),
          zoom: 15,
          logoControl: false,
          mapDataControl: false,
          scaleControl: false,
        };

        mapInstance.current = new naver.maps.Map(mapRef.current, mapOptions);

        // 마커 추가
        new naver.maps.Marker({
          position: new naver.maps.LatLng(lat, lng),
          map: mapInstance.current,
        });
      }
    });
  }, [address]);

  return <div ref={mapRef} className="w-full h-[208px]"></div>; // 지도 영역 설정
};

export default AddressMap;
