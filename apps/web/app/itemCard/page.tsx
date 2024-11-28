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
      deadLine: 'D-40',
      isCount: false,
    },
  ];

  return (
    <>
      {data.map(data => (
        <div w-full key={data.id}>
          <ItemCard
            img={data.img}
            location={data.location}
            title={data.title}
            day={data.day}
            deadLine={data.deadLine}
            isCount={data.isCount}
          />
        </div>
      ))}
    </>
  );
}
