import { useState } from 'react';

function SearchForm({ onSearch }) {
  const [input, setInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setIsSearching(true);
    try {
      await onSearch(input.trim());
    } finally {
      setIsSearching(false);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city name..."
          className="search-input"
          disabled={isSearching}
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={!input.trim() || isSearching}
        >
          {isSearching ? (
            <span className="searching-spinner"></span>
          ) : (
            <span className="search-icon">🔍</span>
          )}
        </button>
      </div>
    </form>
  );
}

export default SearchForm;