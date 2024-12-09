import '../styles/globals.css';
import { BottomNavigation, HomeLayout } from '@/src/widgets';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <HomeLayout>
      {children} <BottomNavigation />
    </HomeLayout>
  );
}
