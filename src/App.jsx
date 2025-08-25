import { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import RecentSearches from './components/RecentSearches';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import GeminiChat from "./components/GeminiChat";
import useWeather from './hooks/useWeather';

import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const { weatherData, forecast, loading, error, fetchWeather } = useWeather();

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleSearch = async (cityName) => {
    setCity(cityName);
    await fetchWeather(cityName);
    
    // Add to recent searches (avoid duplicates)
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item !== cityName);
      return [cityName, ...filtered].slice(0, 5); // Keep only last 5
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Weather Dashboard</h1>
          <p>Get current weather and 5-day forecast for any city</p>
        </header>

        <div className="main-content">
          <div className="search-section">
            <SearchForm onSearch={handleSearch} />
            {recentSearches.length > 0 && (
              <RecentSearches 
                searches={recentSearches} 
                onSelect={handleSearch}
                onClear={clearRecentSearches}
              />
            )}
          </div>

          {loading && <LoadingSpinner />}
          
          {error && <ErrorMessage message={error} />}

          {weatherData && !loading && !error && (
            <div className="weather-content">
              <CurrentWeather data={weatherData} />
              {forecast && <WeatherForecast data={forecast} />}
            </div>
          )}

          {!weatherData && !loading && !error && (
            <div className="welcome-message">
              <div className="welcome-icon">🌤️</div>
              <h3>Welcome to Weather Dashboard</h3>
              <p>Search for a city to get started with current weather and forecast</p>
            </div>
          )}
        </div>
      </div>
      <script src='https://cdn.jotfor.ms/agent/embedjs/0198e094661b714bb52561ff740037ac0281/embed.js'>
      </script>
      {/* <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <GeminiChat />
      </div> */}
    </div>
  );
}

export default App;