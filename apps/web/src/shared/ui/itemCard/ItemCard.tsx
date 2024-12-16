import Image from 'next/image';
import { DateLabel } from '../..';

type VariantType = 'list' | 'gallary' | 'rank';

type Props = {
  variant: VariantType;
  img: string;
  location: string;
  title: string;
  day: string;
  deadLine: number;
  rank: number;
  isCount: boolean;
  ml: boolean;
  mr: boolean;
};

export const ItemCard = ({ variant, img, location, title, day, deadLine, rank, isCount, ml, mr }: Props) => {
  const getDimensions = (variant: VariantType) => {
    switch (variant) {
      case 'list':
        return { width: 160, height: 160 };
      case 'gallary':
        return { width: 168, height: 168 };
      case 'rank':
        return { width: 192, height: 248 };
      default:
        return { width: 160, height: 160 };
    }
  };

  const { width, height } = getDimensions(variant);

  return (
    <div className={`flex shrink-0 flex-col w-[${width}px] gap-2 ${ml ? 'ml-16' : null} ${mr ? 'mr-16' : null}`}>
      {/* 이미지 섹션 */}
      <div className="relative overflow-hidden">
        <Image src={img} width={width} height={height} alt={title} className="rounded-sm" />
        {variant === 'rank' && (
          <div className="absolute rounded-tl-sm rounded-br-sm w-[24px] h-[24px] flex text-center justify-center top-0 left-0 bg-gray-900 text-white ">
            {rank}
          </div>
        )}
        {isCount && (
          <div className="absolute bottom-0 right-0 px-2 py-1 text-xs text-white bg-purple-500 rounded-sm">
            마감임박
          </div>
        )}
      </div>

      {/* 텍스트 섹션 */}
      <div className="flex flex-col ">
        <span className="text-b4 text-gray-600">{location}</span>
        <span
          className={`mt-2 overflow-hidden text-h4 max-w-[${width}px] text-gray-900 whitespace-nowrap text-ellipsis`}>
          {title}
        </span>
        <span className="mt-2 text-b5 text-gray-500">{day}</span>
      </div>
      <DateLabel status="operational" daysLeft={deadLine} />
    </div>
  );
};
