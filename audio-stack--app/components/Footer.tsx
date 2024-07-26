import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.socialLinks}>
          <Link href="https://www.facebook.com/groups/2383392265/" passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer" className={styles.link}>
              Facebook
            </a>
          </Link>
          <Link href="https://x.com/discogs" passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer" className={styles.link}>
              Twitter
            </a>
          </Link>
          <Link href="https://www.instagram.com/discogs/?hl=en" passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer" className={styles.link}>
              Instagram
            </a>
          </Link>
        </div>
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Discogs App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
