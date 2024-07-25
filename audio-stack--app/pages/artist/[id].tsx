import React, { useState } from 'react';
import { useRouter } from 'next/router';

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
    router.push(`/artist/${id}?page=${newPage}`);
  };

  return (
    <div>
      <ul>
        {releases.map(({ id, title, thumb }) => (
          <li key={id} onClick={() => router.push(`/release/${id}`)}>
            <img src={thumb} alt={title} />
            {title}
          </li>
        ))}
      </ul>
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => handlePageChange(page + 1)}>Next</button>
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
