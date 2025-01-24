import { ArrowRightSmall } from '@/public';
import { ToggleButton } from '@/src/shared';
import { ChevronHeader } from '@/src/widgets';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <ChevronHeader title="알림 설정" edit={false} />
      <div className="flex flex-col px-16">
        <div className="flex justify-between items-center py-12">
          <div className="flex flex-col gap-2">
            <div className="text-b1 text-gray-900">푸시 알림 설정</div>
            <div className="text-b5 text-gray-400">시스템 설정을 변경합니다.</div>
          </div>
          <div>
            <ArrowRightSmall />
          </div>
        </div>
        <div className="flex justify-between items-center py-12">
          <div className="flex flex-col gap-2">
            <div className="text-b1 text-gray-900">팝업스토어 소식 알림</div>
            <div className="text-b5 text-gray-400">저장한 팝업스토어의 오픈/종료 소식</div>
          </div>
          <div>
            <ToggleButton defaultChecked={true} />
          </div>
        </div>
        <div className="flex justify-between items-center py-12">
          <div className="flex flex-col gap-2">
            <div className="text-b1 text-gray-900">리뷰 알림</div>
            <div className="text-b5 text-gray-400">내가 작성한 리뷰 활동</div>
          </div>
          <div>
            <ToggleButton defaultChecked={false} />
          </div>
        </div>
        <div className="flex justify-between items-center py-12">
          <div className="flex flex-col gap-2">
            <div className="text-b1 text-gray-900">마케팅 및 이벤트 알림</div>
            <div className="text-b5 text-gray-400 w-250">
              마케팅 알림 수신 동의 시 개인정보 마케팅 활용에 동의하게 됩니다.
            </div>
          </div>
          <div>
            <ToggleButton defaultChecked={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
