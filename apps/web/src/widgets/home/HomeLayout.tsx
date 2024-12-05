import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`flex flex-col h-full px-4 m-auto w-mobile ${pretendard.variable} font-pretendard`}>
        {children}
      </body>
    </html>
  );
}
