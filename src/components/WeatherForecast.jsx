function WeatherForecast({ data }) {
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

  const getDayName = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Group forecast by day (OpenWeatherMap 5-day forecast returns 3-hour intervals)
  const dailyForecasts = data.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // Get daily summary (first 5 days)
  const dailySummaries = Object.entries(dailyForecasts)
    .slice(0, 5)
    .map(([date, forecasts]) => {
      const temps = forecasts.map(f => f.main.temp);
      const conditions = forecasts.map(f => f.weather[0]);
      
      // Get the most common condition for the day
      const conditionCounts = {};
      conditions.forEach(c => {
        conditionCounts[c.main] = (conditionCounts[c.main] || 0) + 1;
      });
      const mostCommonCondition = Object.entries(conditionCounts)
        .sort(([,a], [,b]) => b - a)[0][0];

      const conditionDetails = conditions.find(c => c.main === mostCommonCondition);

      return {
        date: forecasts[0].dt,
        maxTemp: Math.max(...temps),
        minTemp: Math.min(...temps),
        condition: mostCommonCondition,
        description: conditionDetails.description,
        humidity: Math.round(forecasts.reduce((sum, f) => sum + f.main.humidity, 0) / forecasts.length)
      };
    });

  return (
    <div className="weather-forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {dailySummaries.map((day, index) => (
          <div key={day.date} className={`forecast-card ${index === 0 ? 'today' : ''}`}>
            <div className="forecast-day">
              <span className="day-name">
                {index === 0 ? 'Today' : getDayName(day.date)}
              </span>
              <span className="day-date">{getDate(day.date)}</span>
            </div>
            
            <div className="forecast-icon">
              {getWeatherIcon(day.description)}
            </div>
            
            <div className="forecast-temps">
              <span className="temp-high">{formatTemperature(day.maxTemp)}°</span>
              <span className="temp-low">{formatTemperature(day.minTemp)}°</span>
            </div>
            
            <div className="forecast-condition">
              <span className="condition-main">{day.condition}</span>
              <span className="condition-humidity">💧 {day.humidity}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherForecast;