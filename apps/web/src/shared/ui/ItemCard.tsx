import Image from 'next/image';

type Props = {
  img: string;
  location: string;
  title: string;
  day: string;
  deadLine: string;
  isCount: boolean;
};

// type VariantType = 'text' | 'primary' |'secondary' | 'outlined' | 'fillOutlined' |'notice' | 'gradient' | 'help' | 'box' | 'personal'
// type size = 'sm' | 'md' | 'lg' ('primary' |'secondary' | 'outlined' 용도)
// type severityType = 'error' | 'warning' | info | 'success

export const ItemCard = ({ img, location, title, day, deadLine, isCount }: Props) => {
  return (
    <div className="flex flex-col w-full gap-2 ">
      {/* 이미지 섹션 */}
      <div className="relative">
        <Image src={img} width={160} height={160} alt={title} objectFit="cover" className="rounded-sm" />
        {isCount && (
          <div className="absolute bottom-0 right-0  px-[8.5px] py-[5px] bg-purple-500 text-c3 text-white">
            마감임박
          </div>
        )}
      </div>

      {/* 텍스트 섹션 */}
      <div className="flex flex-col gap-[2px]">
        <span className="text-gray-600 text-b4">{location}</span>
        <span className="overflow-hidden text-gray-900 text-h4 whitespace-nowrap text-ellipsis">{title}</span>
        <span className="text-gray-500 text-b5">{day}</span>
      </div>

      {/* 버튼 섹션 */}
      <div className="flex justify-center items-center w-[64px] h-[24px] text-blue-600 text-c2 bg-blue-100  rounded-sm ">
        종료 {deadLine}
      </div>
    </div>
  );
};
