import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/ArtistPage.module.scss'; // Ensure this path is correct

interface Release {
  id: number;
  title: string;
  thumb: string;
}

const ArtistPage = ({ releases }: { releases: Release[] }) => {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`/artist/${id}?page=${newPage}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        {releases.map(({ id, title, thumb }) => (
          <div key={id} className={styles.card} onClick={() => router.push(`/release/${id}`)}>
            <img src={thumb} alt={title} className={styles.cardImage} />
            <p className={styles.cardTitle}>{title}</p>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => handlePageChange(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export async function getServerSideProps({ query: { id, page = 1 } }: any) {
  let releases = [];
  try {
    const response = await fetch(`https://api.discogs.com/artists/${id}/releases?per_page=5&page=${page}`, {
      headers: {
        'Authorization': `Discogs token=${process.env.DISCOGS_TOKEN}`,
      },
    });
    const data = await response.json();
    releases = data.releases;
  } catch (error: any) {
    console.error('Error fetching releases:', error.message);
  }

  return {
    props: {
      releases,
    },
  };
}

export default ArtistPage;
