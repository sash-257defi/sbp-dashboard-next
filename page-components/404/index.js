import Link from 'next/link';
import styles from './index.module.css';
import { Button } from '@/components/Button';
const FourOhFour = () => {
  return (
    <div className={styles.main}>
      <div className={styles.sub_main}>
        <h1 className={styles.title}>404 - Page Not Found</h1>
        <div className={styles.button_content}>
          <Link href="/">
            <Button size="small" type="success">
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FourOhFour;
