import React from 'react';
import styles from '../../styles/ReleasePage.module.scss'; // Ensure this path is correct

interface Track {
  position: string;
  title: string;
}

interface Release {
  title: string;
  images: { uri: string }[];
  notes: string;
  released: string;
  tracklist: Track[];
  community: { have: number };
}

const ReleasePage = ({ release }: { release: Release | null }) => {
  if (!release) return <div>Loading...</div>;

  const { title, images, notes, released, tracklist, community } = release;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {images && images.length > 0 && (
        <img src={images[0].uri} alt={title} className={styles.image} />
      )}
      <p className={styles.notes}>{notes}</p>
      <p className={styles.released}>Released on: {released}</p>
      <div className={styles.tracklistContainer}>
        <h2 className={styles.tracklistTitle}>Tracklist:</h2>
        <ul className={styles.tracklist}>
          {tracklist.map(({ position, title }, index) => (
            <li key={index} className={styles.track}>
              {position} - {title}
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.community}>
        {community.have} people have this release in their collection.
      </p>
    </div>
  );
};

export async function getServerSideProps({ query: { id } }: any) {
  let release = null;
  try {
    const response = await fetch(`https://api.discogs.com/releases/${id}`, {
      headers: {
        'Authorization': `Discogs token=${process.env.DISCOGS_TOKEN}`,
      },
    });
    release = await response.json();
  } catch (error: any) {
    console.error('Error fetching release data:', error.message);
  }

  return {
    props: {
      release,
    },
  };
}

export default ReleasePage;
