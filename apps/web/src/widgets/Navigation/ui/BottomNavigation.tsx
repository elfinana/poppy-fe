'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLoginStore } from 'store/login/loginStore';
import { useMenu } from 'store/bottomNavigation/menuStore';
import { Home, AcHome, Search, AcSearch, Myplan, MyPage, AcMyPage, AcMyPlan } from '@/public';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/src/shared';

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
    action: '/book',
    requiresAuth: true,
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
  const { menu, setMenu } = useMenu();
  const [active, setActive] = useState(menu);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const { token } = useLoginStore();

  const handleNavigation = (text: string, action: string, requiresAuth?: boolean) => {
    setMenu(text); // 클릭된 버튼을 활성화
    if (requiresAuth && !token) {
      setRedirectPath(action);
      setDialogOpen(true);
    } else {
      router.push(action);
    }
  };

  return (
    <div className="sticky bottom-0 flex w-full pt-8 pb-4 bg-white border-t h-fit border-t-gray-100 rounded-t-20">
      {navArr.map(({ text, image: Icon, activeImg: ActiveIcon, action, requiresAuth }) => (
        <button
          key={text}
          onClick={() => {
            if (action) {
              handleNavigation(text, action, requiresAuth);
            }
          }}
          className="flex flex-col items-center justify-center w-full h-full gap-1">
          {active === text ? <ActiveIcon /> : <Icon />}
          <span className={`text-c2 group-hover:text-c1 ${active === text ? 'text-gray-800' : 'text-gray-500'}`}>
            {text}
          </span>
        </button>
      ))}
      <AlertDialog open={isDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>로그인 필요</AlertDialogTitle>
            <AlertDialogDescription>로그인 후 이용할 수 있습니다.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDialogOpen(false)}>닫기</AlertDialogCancel>
            <AlertDialogAction
              variant="warning"
              onClick={() => {
                setDialogOpen(false);
                router.push('/login');
              }}>
              로그인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
