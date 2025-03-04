import { useState } from 'react';

function WeatherSearch({ onSearch, loading }) {
  const [location, setLocation] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location);
    }
  };
  
  return (
    <div className="weather-search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your city (e.g., New York)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !location.trim()}>
          {loading ? 'Loading...' : 'Get Outfit Recommendations'}
        </button>
      </form>
    </div>
  );
}

export default WeatherSearch;