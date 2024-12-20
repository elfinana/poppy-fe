'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Home, AcHome, Search, AcSearch, Myplan, MyPage, AcMyPage, AcMyPlan } from '@/public';

const navArr = [
  {
    text: '홈',
    image: Home,
    activeImg: AcHome,
    action: '/',
  },
  {
    text: '검색',
    image: Search,
    activeImg: AcSearch,
    action: '/search',
  },
  {
    text: '예약',
    image: Myplan,
    activeImg: AcMyPlan,
    action: '/login',
  },
  {
    text: '마이페이지',
    image: MyPage,
    activeImg: AcMyPage,
    action: '/mypage',
  },
];

export const BottomNavigation = () => {
  const router = useRouter();
  const [active, setActive] = useState('홈');

  return (
    <div className="flex sticky bottom-0 pt-8 pb-4 w-full bg-white border-t h-fit border-t-gray-100 rounded-t-20">
      {navArr.map(({ text, image: Icon, activeImg: ActiveIcon, action }) => (
        <button
          key={text}
          onClick={() => {
            setActive(text);
            if (action) {
              router.push(action);
            }
          }}
          className="flex flex-col gap-1 justify-center items-center w-full h-full">
          {active === text ? <ActiveIcon /> : <Icon />}
          <span className={`text-c2 group-hover:text-c1 ${active === text ? 'text-gray-800' : 'text-gray-500'}`}>
            {text}
          </span>
        </button>
      ))}
    </div>
  );
};
