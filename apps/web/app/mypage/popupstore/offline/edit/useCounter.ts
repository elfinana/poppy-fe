import { max } from 'date-fns';
import { useEffect, useState } from 'react';

// 추후 서버 데이터 삽입
const dummyMaximumCapacity = 10;
const minimumCapacity = 0;
const dummyCurrentCapacity = 5;

export const useCounter = () => {
  const [maximumCapacity, setMaximumCapacity] = useState(dummyMaximumCapacity);
  const [currentCapacity, setCurrentCapacity] = useState(dummyCurrentCapacity);
  const [count, setCount] = useState(currentCapacity);
  const [enabled, setEnabled] = useState<'enabled' | 'disabled'>('disabled');

  useEffect(() => {
    // count가 변경될 때마다 enabled 상태 업데이트
    setEnabled(count === currentCapacity ? 'disabled' : 'enabled');
  }, [count, currentCapacity]);

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
    if (count > maximumCapacity) {
      // alert 최대 인원 n명
      setCount(currentCapacity);
      return;
    } else {
      setCurrentCapacity(count);
      setMaximumCapacity(count);
    }
  };

  return { count, enabled, maximumCapacity, setCount, countHandler, discountHandler, maximumCapacityHandler };
};
