import WeatherService from '../services/weatherService';
import { useEffect, useState } from 'react';

const Weather = ({ country }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    WeatherService.getAll(
      country.capitalInfo.latlng[0],
      country.capitalInfo.latlng[1]
    ).then((result) => {
      setWeather(result);
    });
  }, [country.capitalInfo.latlng]);
  return weather.length === 0 ? (
    <>Waiting for weather</>
  ) : (
    <>
      <h3>Weather in {country.capital[0]}</h3>
      <p>temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
      <img
        alt={weather.weather[0].description}
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  );
};

export default Weather;
