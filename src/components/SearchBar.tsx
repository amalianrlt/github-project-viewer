import React, { useState, FormEvent } from 'react';
import '../styles/SearchBar.css';

interface SearchBarProps {
  onSearch: (username: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="search-input"
        aria-label="GitHub username"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default SearchBar; 