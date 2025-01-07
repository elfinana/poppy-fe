import { Suspense } from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="w-full h-full">{children}</div>;
    </Suspense>
  );
}
