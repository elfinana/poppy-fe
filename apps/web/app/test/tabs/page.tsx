import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared';

export default function Page() {
  const tabsA = [
    { value: 'a', label: '정보', content: '정보' },
    { value: 'b', label: '리뷰 26', content: '리뷰 26' },
  ];

  const tabsB = [
    { value: 'c', label: '날짜', content: '날짜' },
    { value: 'd', label: '위치', content: '위치' },
    { value: 'e', label: '평점', content: '평점' },
    { value: 'f', label: '카테고리', content: '카테고리' },
  ];

  return (
    <div className="flex flex-col w-full gap-10">
      <Tabs defaultValue="a" className="w-full">
        <TabsList>
          {tabsA.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsA.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>

      <Tabs defaultValue="c" className="w-full">
        <TabsList>
          {tabsB.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsB.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
