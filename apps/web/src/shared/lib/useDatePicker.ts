import { useState } from 'react';
import { formatDateDotFormat } from './utils';

const useDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);

  const onSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(formatDateDotFormat(date));
    // 날짜에 따른 시간 리스트를 보여줘야함
    // api ...
  };
  const onReset = () => {
    setSelectedDate(undefined);
  };

  return { selectedDate, onSelect, onReset };
};

export default useDatePicker;
