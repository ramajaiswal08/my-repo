import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaWind } from 'react-icons/fa';
import { WiHumidity, WiThermometer } from 'react-icons/wi';
import './Weather.css';

const Weather = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState('London');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=55c579bb0e32472d06d3e7d558ff5e94&units=metric`);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err.response || err.message);
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setLoading(true);
      setQuery(e.target.value);
    }
  };

  return (
    <div className="box">
      <div className="inputData">
        <input
          type="search"
          className="inputField"
          placeholder="Enter city"
          onKeyPress={handleSearch}
        />
        <button onClick={fetchData}>
          <FaSearch />
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div className="weatherInfo">
          <h2>{data.name}</h2>
          
          <div className='weather-img'>
            <img 
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
              alt={data.weather[0].description}
            />
            <h3 className='desc'>{data.weather[0].description}</h3>
          </div>
          <div className='weather-stats'> 
            <div className='weather-temp'>
              <div className='temperature-icon'>
                 <WiThermometer />
              </div>
              <p>Temp:{Math.round(data.main.temp)}°C</p>
            </div>
            <div className='weather-humidity'>
              <div className='humidity-icon'>
                <WiHumidity />
              </div>
              <p>Humidity: {data.main.humidity}%</p>
            </div>
            <div className='weather-speed'>
              <div className='wind-icon'>
                <FaWind />
              </div>
              <p>Wind Speed: {data.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
      <div className="waveWrapper">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  );
};

export default Weather;
