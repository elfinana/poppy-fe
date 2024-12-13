import Head from 'next/head';
import '../styles/globals.css';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`min-w-[320px] h-screen max-w-[780px] ${pretendard.variable} font-pretendard`}>{children}</body>
    </html>
  );
}
