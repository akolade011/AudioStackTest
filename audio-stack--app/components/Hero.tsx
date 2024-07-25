import React from 'react';
import Image from 'next/image';
import styles from './Hero.module.scss';

const Hero: React.FC = () => {
  return (
    <div className={styles.hero}>
      <Image
        src="/images/musicImage.avif" // Local image path
        alt="Music"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className={styles.heroContent}>
        <h1 className={styles.title}>Discover New Music</h1>
        <p className={styles.subtitle}>Find and explore your favorite artists and albums.</p>
      </div>
    </div>
  );
};

export default Hero;
