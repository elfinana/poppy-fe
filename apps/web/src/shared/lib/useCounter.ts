import { useEffect, useState } from 'react';

// 추후 서버 데이터 삽입
const dummyMaximumCapacity = 10;
const minimumCapacity = 0;

export const useCounter = () => {
  const [maximumCapacity, setMaximumCapacity] = useState(dummyMaximumCapacity);
  const [count, setCount] = useState(dummyMaximumCapacity);
  const [enabled, setEnabled] = useState<'enabled' | 'disabled'>('disabled');

  useEffect(() => {
    // count가 변경될 때마다 enabled 상태 업데이트
    setEnabled(count === maximumCapacity ? 'disabled' : 'enabled');
  }, [count, maximumCapacity]);

  const discountHandler = () => {
    if (count === minimumCapacity) {
      // alert 최소 인원 0명
      return;
    } else {
      return setCount(count - 1);
    }
  };
  const countHandler = () => {
    return setCount(count + 1);
  };

  const maximumCapacityHandler = () => {
    setMaximumCapacity(count);
  };

  return { count, enabled, maximumCapacity, setCount, countHandler, discountHandler, maximumCapacityHandler };
};
