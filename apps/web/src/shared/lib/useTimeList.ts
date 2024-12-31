import { Time } from '@/src/entities/home/model/PopupData';
import { useState } from 'react';

const generateTimeList = (openingTime: Time, closingTime: Time): string[] | undefined => {
  if (!openingTime || !closingTime) return undefined;

  const timeList: string[] = [];

  const formatTime = (hour: number): string => {
    let period = '오전';
    let formattedHour = hour;

    if (hour >= 12) {
      period = '오후';
      formattedHour = hour === 12 ? 12 : hour - 12;
    }

    if (hour === 0) formattedHour = 12; // 자정 처리

    return `${period} ${formattedHour}:00`;
  };

  for (let hour = openingTime.hour; hour <= closingTime.hour; hour++) {
    timeList.push(formatTime(hour));
  }

  return timeList;
};

const useTimeList = (openingTime: Time, closingTime: Time) => {
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [time, setTime] = useState<string[] | undefined>(generateTimeList(openingTime, closingTime));
  const onSelect = (time: string) => {
    setSelectedTime(time);
  };

  return { time, selectedTime, onSelect };
};

export default useTimeList;
