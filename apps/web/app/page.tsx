import { Button } from '@/src/shared';
import Link from 'next/link';

export default function page() {
  return (
    <Button className="bg-warning">
      <Link href="/design">Go to Design</Link>
    </Button>
  );
}
