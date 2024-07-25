import React from 'react';
import { useRouter } from 'next/router';

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
    <div>
      <h1>{title}</h1>
      <img src={images[0].uri} alt={title} />
      <p>{notes}</p>
      <p>Released on: {released}</p>
      <p>Tracklist:</p>
      <ul>
        {tracklist.map(({ position, title }, index) => (
          <li key={index}>
            {position} - {title}
          </li>
        ))}
      </ul>
      <p>{community.have} people have this release in their collection.</p>
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
