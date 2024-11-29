export function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col h-full px-4 m-auto w-mobile">{children}</body>
    </html>
  );
}
