import { useState } from 'react';

const API_KEY = '919166f9bd7e492b84b64444252508';
const BASE_URL = 'https://api.weatherapi.com/v1';

function useWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch current weather and 5-day forecast in one call
      const response = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=5&aqi=no&alerts=no`
      );
      
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('City not found. Please check the spelling and try again.');
        } else if (response.status === 401) {
          throw new Error('API key is invalid. Please check your configuration.');
        } else {
          throw new Error('Unable to fetch weather data. Please try again later.');
        }
      }
      
      const data = await response.json();

      // Transform WeatherAPI data to match our component expectations
      const transformedWeatherData = {
        name: data.location.name,
        sys: { country: data.location.country },
        main: {
          temp: data.current.temp_c,
          feels_like: data.current.feelslike_c,
          humidity: data.current.humidity,
          pressure: data.current.pressure_mb
        },
        weather: [{
          main: data.current.condition.text,
          description: data.current.condition.text.toLowerCase(),
          icon: data.current.condition.icon
        }],
        wind: {
          speed: data.current.wind_kph / 3.6 // Convert km/h to m/s
        },
        visibility: data.current.vis_km * 1000 // Convert km to meters
      };

      // Transform forecast data
      const transformedForecast = {
        list: data.forecast.forecastday.map(day => ({
          dt: new Date(day.date).getTime() / 1000, // Convert to Unix timestamp
          main: {
            temp_max: day.day.maxtemp_c,
            temp_min: day.day.mintemp_c,
            humidity: day.day.avghumidity
          },
          weather: [{
            main: day.day.condition.text,
            description: day.day.condition.text.toLowerCase(),
            icon: day.day.condition.icon
          }]
        }))
      };

      setWeatherData(transformedWeatherData);
      setForecast(transformedForecast);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    weatherData,
    forecast,
    loading,
    error,
    fetchWeather
  };
}

export default useWeather;