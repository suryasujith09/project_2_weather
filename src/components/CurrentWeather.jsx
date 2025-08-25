function CurrentWeather({ data }) {
  const getWeatherIcon = (condition) => {
    const icons = {
      'clear sky': '☀️',
      'few clouds': '🌤️',
      'scattered clouds': '⛅',
      'broken clouds': '☁️',
      'overcast clouds': '☁️',
      'light rain': '🌦️',
      'moderate rain': '🌧️',
      'heavy intensity rain': '⛈️',
      'thunderstorm': '⛈️',
      'snow': '❄️',
      'mist': '🌫️',
      'fog': '🌫️'
    };
    
    return icons[condition.toLowerCase()] || '🌤️';
  };

  const formatTemperature = (temp) => Math.round(temp);

  return (
    <div className="current-weather">
      <div className="current-weather-header">
        <h2>{data.name}, {data.sys.country}</h2>
        <p className="current-time">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <div className="current-weather-main">
        <div className="temperature-section">
          <div className="weather-icon">
            {getWeatherIcon(data.weather[0].description)}
          </div>
          <div className="temperature">
            <span className="temp-value">{formatTemperature(data.main.temp)}</span>
            <span className="temp-unit">°C</span>
          </div>
        </div>

        <div className="weather-description">
          <h3>{data.weather[0].main}</h3>
          <p>{data.weather[0].description}</p>
          <p className="feels-like">
            Feels like {formatTemperature(data.main.feels_like)}°C
          </p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-icon">💧</span>
          <div>
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{data.main.humidity}%</span>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">💨</span>
          <div>
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{data.wind.speed} m/s</span>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">📊</span>
          <div>
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{data.main.pressure} hPa</span>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">👁️</span>
          <div>
            <span className="detail-label">Visibility</span>
            <span className="detail-value">{(data.visibility / 1000).toFixed(1)} km</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;