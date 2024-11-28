export function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen px-4 m-auto w-mobile">{children}</body>
    </html>
  );
}
