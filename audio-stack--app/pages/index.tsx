import React, { useState } from 'react';
import { useRouter } from 'next/router';
import SearchBar from '../components/SearchBar'; 
import Hero from '../components/Hero'; 
import styles from './HomePage.module.scss'; 

interface Artist {
  id: number;
  title: string;
}

const HomePage: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const searchArtists = async (searchTerm: string) => {
    setIsSearching(true);
    try {
      const response = await fetch(`/api/search?q=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { results } = await response.json();
      setArtists(results);
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
    setIsSearching(false);
  };

  return (
    <div className={styles.page}>
      <Hero />
      <SearchBar onSearch={searchArtists} isSearching={isSearching} />
      <ul className={styles.artistList}>
        {artists.map(({ id, title }) => (
          <li key={id} onClick={() => router.push(`/artist/${id}`)} className={styles.artistItem}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
