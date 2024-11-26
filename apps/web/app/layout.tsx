import '../styles/globals.css';
import { HomeLayout } from '@/src/widgets';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>;
}
