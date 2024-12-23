import { Calendar } from '@/src/shared/ui/calendar';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';

type Props = {
  className?: string;
  selectedDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
};
const DatePicker = (props: Props) => {
  return (
    <Calendar
      mode="single"
      selected={props.selectedDate ? props.selectedDate : undefined}
      onSelect={props.onSelect}
      disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
      className={props.className}
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
