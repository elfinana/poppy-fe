'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLoginStore } from 'store/login/loginStore';
import { useMenu } from 'store/bottomNavigation/menuStore';
import { Home, AcHome, Search, AcSearch, Myplan, MyPage, AcMyPage, AcMyPlan } from '@/public';

const navArr = [
  {
    text: '홈',
    value: 'home',
    image: Home,
    activeImg: AcHome,
    action: '/',
  },
  {
    text: '검색',
    value: 'search',
    image: Search,
    activeImg: AcSearch,
    action: '/search',
  },
  {
    text: '예약',
    value: 'book',
    image: Myplan,
    activeImg: AcMyPlan,
    action: '/book',
    requiresAuth: true,
  },
  {
    text: '마이페이지',
    value: 'mypage',
    image: MyPage,
    activeImg: AcMyPage,
    action: '/mypage',
  },
];

export const BottomNavigation = () => {
  const router = useRouter();
  // const { menu, setMenu } = useMenu();
  const menu = usePathname().split('/')[1];

  const handleNavigation = (text: string, action: string) => {
    // setMenu(text); // 클릭된 버튼을 활성화
    router.push(action);
  };

  return (
    <div className="sticky bottom-0 flex w-full pt-8 pb-4 bg-white border-t h-fit border-t-gray-100 rounded-t-20">
      {navArr.map(({ text, value, image: Icon, activeImg: ActiveIcon, action }) => (
        <button
          key={text}
          onClick={() => {
            if (action) {
              handleNavigation(text, action);
            }
          }}
          className="flex flex-col items-center justify-center w-full h-full gap-1">
          {menu === value ? <ActiveIcon /> : <Icon />}
          <span className={`text-c2 group-hover:text-c1 ${menu === value ? 'text-gray-800' : 'text-gray-500'}`}>
            {text}
          </span>
        </button>
      ))}
    </div>
  );
};
