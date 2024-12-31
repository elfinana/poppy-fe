import useDatePicker from './useDatePicker';
import { useCounter } from './useCounter';
import useTimeList from './useTimeList';
import { Time } from '@/src/entities/home/model/PopupData';

type Props = {
  popupId: number;
  openingTime: Time;
  closingTime: Time;
  price: number;
  storeName: string;
  address: string;
};

const useBooking = (props: Props) => {
  const { popupId, openingTime, closingTime, price, storeName, address } = props;
  const { selectedDate, onSelect, onReset } = useDatePicker();
  const { count, countHandler, discountHandler } = useCounter();
  const { time, selectedTime, onSelect: onSelectTime } = useTimeList(openingTime, closingTime);
  const bookData = {
    popupId: popupId,
    date: selectedDate,
    time: selectedTime,
    people: count,
    price: price,
    name: storeName,
    address: address,
  };

  return {
    onSelect,
    onReset,
    countHandler,
    discountHandler,
    time,
    onSelectTime,
    bookData,
  };
};

export default useBooking;
