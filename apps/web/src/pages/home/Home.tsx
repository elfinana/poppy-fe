import { Button } from '@/src/shared/components/ui/button';

import styles from '../../../styles/index.module.css';
import { Checkbox } from '@/src/shared/components/ui/checkbox';

export function Home() {
  return (
    <div className={styles.container}>
      <h1>Poppy Frontend</h1>
      <Button variant="outline">HELLO</Button>
      <Button variant="default">HELLO</Button>
      <Checkbox></Checkbox>
    </div>
  );
}
