'use client';

import { Sort } from '@/public';
import { getScrapList } from '@/src/entities';
import { CheckboxButton, formatToMD, ItemCard, ItemCardSkeleton, PrimaryButton } from '@/src/shared';
import { ChevronHeader, ItemCardData } from '@/src/widgets';
import React from 'react';
import { useQuery } from 'react-query';
import { useLoginStore } from 'store/login/loginStore';

const Page = () => {
  const { token } = useLoginStore();

  const deleteList = React.useRef<Array<number>>([]);
  const [editMode, setEditMode] = React.useState(false);
  const [count, setCount] = React.useState(deleteList.current.length);

  const editClickHandler = () => {
    setEditMode(prev => !prev);
  };

  const submitDeleteHandler = () => {
    if (deleteList.current.length > 0) {
      console.log('submitted!!');
    } else {
      console.log('have nothing to submit.');
    }
  };

  const { data, error, isLoading } = useQuery(['getScrapList'], () => getScrapList(token!), {
    enabled: !!token,
  });

  return (
    <div className="flex flex-col h-full">
      <div className="relative bg-white">
        <ChevronHeader
          title="저장한 팝업"
          edit={true}
          editText={editMode ? '완료' : '편집'}
          onEdit={editClickHandler}
        />
      </div>
      <div className="overflow-y-auto">
        <div className="flex justify-end px-16 mt-4">
          <div className="flex">
            <span>
              <Sort />
            </span>
            <span className="ml-4 text-gray-500 text-b2">최근 등록순</span>
          </div>
        </div>
        <div className="grid grid-cols-2 px-16 mt-12 gap-y-32 gap-x-8">
          {isLoading
            ? Array.from({ length: 8 }, (_, idx) => <ItemCardSkeleton key={`SKEL_${idx}`} variant="imageFull" />)
            : data?.map((item, idx) => (
                <div key={`ITEMCARD_${idx}`} className="relative flex">
                  {editMode && (
                    <CheckboxButton
                      className="absolute top-[8px] right-[8px] z-50"
                      onCheckedChange={checked => {
                        if (checked) {
                          deleteList.current.push(item.id);
                        } else {
                          deleteList.current.splice(deleteList.current.indexOf(item.id), 1);
                        }
                        setCount(deleteList.current.length);
                      }}
                    />
                  )}
                  <ItemCard
                    id={item.id}
                    variant="gallery"
                    img={item.thumbnailUrl ? item.thumbnailUrl : 'https://placehold.co/500/webp'}
                    location={item.location}
                    title={item.name}
                    day={`${formatToMD({ year: item.startDate.year, month: item.startDate.month, day: item.startDate.day })} - ${formatToMD({ year: item.endDate.year, month: item.endDate.month, day: item.endDate.day })}`}
                    deadLine={0}
                    rank={idx + 1}
                    isCount={item.isAlmostFull}
                    ml={false}
                    mr={false}
                    imageFull
                    noRoute={editMode}
                  />
                </div>
              ))}
        </div>
        <div className="mt-bottomMargin" />
        {editMode && (
          <div className="fixed bottom-0 z-50 flex items-center justify-center w-full px-16 py-8 bg-white">
            <PrimaryButton
              variant={deleteList.current.length > 0 ? 'enabled' : 'disabled'}
              onClick={submitDeleteHandler}>
              {count > 0 ? `${count}개의 항목 삭제하기` : '삭제할 항목을 선택해주세요'}
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
