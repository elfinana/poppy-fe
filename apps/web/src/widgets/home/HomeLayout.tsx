import '@/styles/global.css';

export function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col px-4 m-auto h-screen w-mobile">{children}</body>
    </html>
  );
}
