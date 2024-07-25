import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.titleWrapper}>
          <Link href="/" legacyBehavior>
            <a>
              <h2 className={styles.title}>Discogs</h2>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
