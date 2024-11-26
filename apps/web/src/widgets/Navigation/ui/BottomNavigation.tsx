'use client';
import { Button } from '@/components/ui/button';
import { Home, MyPage, Plan, Search } from '@/public/index';

const navArr = [
  {
    text: '홈',
    image: Home,
  },
  {
    text: '검색',
    image: Search,
  },

  {
    text: '예약',
    image: Plan,
  },
  {
    text: '마이페이지',
    image: MyPage,
  },
];
const BottomNavigation = () => {
  return (
    <div className="flex w-full h-[56px] pt-2 pb-1">
      {navArr.map(({ text, image: Icon }) => (
        <Button key={text} className="flex flex-col gap-1 w-full text-gray-500 bg-white hover:text-gray800 group">
          <Icon className="text-gray-500 fill-none group-hover:text-gray800 group-hover:fill-gray800 group-hover:stroke-gray800" />
          <span className="text-c2 group-hover:text-c1">{text}</span>
        </Button>
      ))}
    </div>
  );
};

export default BottomNavigation;
