import React, { useState } from 'react';
import styles from './SearchBar.module.scss';  // Make sure this path is correct

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  isSearching: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isSearching }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchForm}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for an artist"
        className={styles.searchInput}
      />
      <button type="submit" disabled={isSearching} className={styles.searchButton}>
        {isSearching ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchBar;
