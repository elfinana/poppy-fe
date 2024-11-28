import Image from 'next/image';

type Props = {
  img: string;
  location: string;
  title: string;
  day: string;
  deadLine: string;
  isCount: boolean;
};

export const ItemCard = ({ img, location, title, day, deadLine, isCount }: Props) => {
  return (
    <div className="flex flex-col w-full gap-2 ">
      {/* 이미지 섹션 */}
      <div className=" w-[160px] h-[160px]">
        <Image
          src={img}
          width={'160'}
          height={160}
          alt={title}
          objectFit="cover" // 이미지 비율 유지
          className="rounded-t-lg" // 이미지 상단 모서리 둥글게 처리
        />
      </div>

      {/* 텍스트 섹션 */}
      <div className="flex flex-col gap-[2px]">
        <span className="text-sm text-gray-600">{location}</span>
        <span className="text-base font-bold text-gray-900">{title}</span>
        <span className="text-sm text-gray-500">{day}</span>
      </div>

      {/* 버튼 섹션 */}
      <button type="button" className="w-[64px] h-[24px] bg-gray-300 text-c2 text-blue-600 text-white rounded ">
        종료 {deadLine}
      </button>
    </div>
  );
};
