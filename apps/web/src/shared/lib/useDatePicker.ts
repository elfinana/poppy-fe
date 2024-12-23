import { useState } from 'react';

const useDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const onSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
  };
  const onReset = () => {
    setSelectedDate(undefined);
  };

  return { selectedDate, onSelect, onReset };
};

export default useDatePicker;
