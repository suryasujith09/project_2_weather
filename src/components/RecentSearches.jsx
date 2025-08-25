function RecentSearches({ searches, onSelect, onClear }) {
  return (
    <div className="recent-searches">
      <div className="recent-searches-header">
        <h4>Recent Searches</h4>
        <button className="clear-button" onClick={onClear}>
          Clear All
        </button>
      </div>
      
      <div className="recent-searches-list">
        {searches.map((city, index) => (
          <button
            key={`${city}-${index}`}
            className="recent-search-item"
            onClick={() => onSelect(city)}
          >
            <span className="search-icon">📍</span>
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecentSearches;