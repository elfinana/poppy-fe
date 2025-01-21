import React, { useEffect, useRef } from 'react';

type AddressMapProps = {
  address: string;
};

const AddressMap = ({ address }: AddressMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);

  const loadNaverMapScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (typeof naver !== 'undefined' && naver.maps) {
        resolve(); // 네이버 지도 API가 이미 로드된 경우
        return;
      }

      const script = document.createElement('script');
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=tiv3ffuyzr&submodules=geocoder`;
      script.async = true;
      script.onload = () => {
        console.log('Naver Map Script loaded successfully');
        resolve();
      };
      script.onerror = () => reject(new Error('네이버 지도 API 로드 실패'));
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    if (!address) {
      console.warn('Address is empty. Cannot render map.');
      return;
    }

    const initializeMap = async () => {
      try {
        await loadNaverMapScript(); // 네이버 지도 스크립트 로드

        if (!naver.maps.Service || !naver.maps.Service.geocode) {
          setTimeout(initializeMap, 1000);
          return;
        }

        const searchAddressToCoordinate = (
          address: string,
          callback: (lat: number | null, lng: number | null) => void,
        ) => {
          if (!naver.maps.Service || !naver.maps.Service.geocode) {
            callback(null, null);
            return;
          }

          naver.maps.Service.geocode({ query: address }, (status, response) => {
            if (status !== naver.maps.Service.Status.OK) {
              callback(null, null);
              return;
            }

            const result = response.v2.addresses[0];
            if (!result) {
              callback(null, null);
              return;
            }

            const lat = parseFloat(result.y);
            const lng = parseFloat(result.x);
            callback(lat, lng);
          });
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
      } catch (error) {
        console.error('지도 초기화 중 오류 발생:', error);
      }
    };

    initializeMap();
  }, [address]);

  return <div ref={mapRef} className="w-full h-[208px]"></div>;
};

export default AddressMap;
