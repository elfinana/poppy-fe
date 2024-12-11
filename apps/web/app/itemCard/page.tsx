import { ItemCard } from '@/src/shared';
import React from 'react';

type Props = {};

export default function page({}: Props) {
  const data = [
    {
      id: 1,
      img: '/images/img-card-1.png',
      location: '서울 영등포구',
      title: '골든볼 팝업스토어',
      day: '05.21(금) - 12.31(일)',
      deadLine: 40,
      isCount: true,
    },
    {
      id: 2,
      img: '/images/img-card-2.png',
      location: '서울 성동구',
      title: '어노브 이터널 아우라 성수 팝업스토어',
      day: '11.08(금) - 11.24(일)',
      deadLine: 3,
      isCount: false,
    },
    {
      id: 3,
      img: '/images/img-card-2.png',
      location: '서울 성동구',
      title: '어노브 이터널 아우라 성수 팝업스토어',
      day: '11.08(금) - 11.24(일)',
      deadLine: 3,
      isCount: false,
    },
    {
      id: 4,
      img: '/images/img-card-2.png',
      location: '서울 성동구',
      title: '어노브 이터널 아우라 성수 팝업스토어',
      day: '11.08(금) - 11.24(일)',
      deadLine: 3,
      isCount: false,
    },
  ];
  const rankData = [
    {
      id: 1,
      img: '/images/img-card-3.png',
      location: '서울 영등포구',
      title: '골든볼 팝업스토어',
      day: '05.21(금) - 12.31(일)',
      deadLine: 40,
      isCount: true,
    },
    {
      id: 2,
      img: '/images/img-card-4.png',
      location: '서울 성동구',
      title: '어노브 이터널 아우라 성수 팝업스토어',
      day: '11.08(금) - 11.24(일)',
      deadLine: 3,
      isCount: false,
    },
    {
      id: 3,
      img: '/images/img-card-3.png',
      location: '서울 성동구',
      title: '어노브 이터널 아우라 성수 팝업스토어',
      day: '11.08(금) - 11.24(일)',
      deadLine: 3,
      isCount: false,
    },
    {
      id: 4,
      img: '/images/img-card-4.png',
      location: '서울 성동구',
      title: '어노브 이터널 아우라 성수 팝업스토어',
      day: '11.08(금) - 11.24(일)',
      deadLine: 3,
      isCount: false,
    },
  ];

  return (
    <>
      <div className="flex flex-col w-full ">
        <h1 className="w-full mb-4 text-center text-h1"> list </h1>
        <div className="flex w-full overflow-x-auto gap-[12px]">
          {data.map(data => (
            <div key={data.id}>
              <ItemCard
                variant={'list'}
                img={data.img}
                location={data.location}
                title={data.title}
                day={data.day}
                deadLine={data.deadLine}
                rank={data?.id}
                isCount={data.isCount}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full ">
        <h1 className="w-full mb-4 text-center text-h1"> gallary </h1>
        <div className="flex w-full overflow-x-auto gap-[12px]">
          {data.map(data => (
            <div key={data.id}>
              <ItemCard
                variant={'gallary'}
                img={data.img}
                location={data.location}
                title={data.title}
                day={data.day}
                deadLine={data.deadLine}
                rank={data?.id}
                isCount={data.isCount}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full ">
        <h1 className="w-full mb-4 text-center text-h1"> rank </h1>
        <div className="flex w-full overflow-x-auto gap-[12px]">
          {rankData.map(data => (
            <div key={data.id}>
              <ItemCard
                variant={'rank'}
                img={data.img}
                location={data.location}
                title={data.title}
                day={data.day}
                deadLine={data.deadLine}
                rank={data?.id}
                isCount={data.isCount}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
