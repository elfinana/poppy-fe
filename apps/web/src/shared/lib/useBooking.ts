import { useState, useEffect } from 'react';
import useDatePicker from './useDatePicker';
import { useCounter } from './useCounter';
import useTimeList from './useTimeList';
import { Time } from '@/src/entities/home/model/PopupData';
import { BookData } from '@/src/widgets/book/model/bookData';

type Props = {
  popupId: number;
  openingTime: Time;
  closingTime: Time;
  price: number;
  storeName: string;
  address: string;
};

const useBooking = ({ popupId, openingTime, closingTime, price, storeName, address }: Props) => {
  const { selectedDate, onSelect, onReset } = useDatePicker();
  const { count, countHandler, discountHandler } = useCounter();
  const { time, selectedTime, onSelect: onSelectTime } = useTimeList(openingTime, closingTime);

  const [bookData, setBookData] = useState<BookData>({
    popupStoreId: popupId,
    date: '',
    time: '',
    price: price,
    address: address,
    popupStoreName: storeName,
    thumbnail: '',
    person: 0,
    orderId: '',
    reservationId: 0,
  });

  useEffect(() => {
    setBookData(prevState => ({
      ...prevState,
      date: selectedDate || '',
      time: selectedTime || '',
      person: count,
    }));
  }, [selectedDate, selectedTime, count]);

  return {
    bookData,
    setBookData,
    onSelect,
    onReset,
    countHandler,
    discountHandler,
    time,
    onSelectTime,
  };
};

export default useBooking;
