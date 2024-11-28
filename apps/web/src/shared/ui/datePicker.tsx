'use client';
import { Calendar } from '@/src/shared/ui/calendar';
import React, { useState } from 'react';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const onSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
  };

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={onSelect}
      disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
      classNames={{
        day_today: 'text-gray-800',
        day_selected: 'bg-blue-500 !text-white rounded-xl',
      }}
      locale={ko}
      formatters={{
        formatCaption: date => format(date, 'yyyy.MM'),
      }}
    />
  );
};

export { DatePicker };
