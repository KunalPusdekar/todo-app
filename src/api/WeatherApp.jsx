import React, { useState, useEffect } from "react";
import './weather.css';
import clear from '../icons/clear.svg';
import haze from '../icons/haze.svg';
import rain from '../icons/rain.svg';
import snow from '../icons/snow.svg';
import clouds from '../icons/cloud.svg';
import storm from '../icons/storm.svg';

const WeatherApp = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "#495af7");
  const [darkMode, setDarkMode] = useState(false);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [infoMessage, setInfoMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "b190a0605344cc4f3af08d0dd473dd25";

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", theme);
  }, [theme]);

  const handleThemeChange = (color) => {
    setTheme(color);
    localStorage.setItem("theme", color);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    const newTheme = darkMode ? "#495af7" : "#000";
    handleThemeChange(newTheme);
  };

  const handleCityInput = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === "404") {
        setInfoMessage(`${city} isn't a valid city name`);
        setWeather(null);
      } else {
        setWeather(data);
        setInfoMessage("");
      }
    } catch (error) {
      setInfoMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = () => {
    if (!city) return;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchWeather(url);
  };

  const fetchWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
          fetchWeather(url);
        },
        (error) => setInfoMessage(error.message)
      );
    } else {
      alert("Your browser does not support geolocation.");
    }
  };

  const getWeatherIcon = (weather) => {
    const id = weather.weather[0].id;
    if (id === 800) return clear;
    else if (id >= 200 && id <= 232) return storm;
    else if (id >= 600 && id <= 622) return snow;
    else if (id >= 701 && id <= 781) return haze;
    else if (id >= 801 && id <= 804) return clouds;
    else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) return rain;
  };

  return (
    <div className={`wrapper ${weather ? "active" : ""}`}>
      <div className="dark-mode" onClick={toggleDarkMode}>
        <span className="dark-mode-btn">
          <i className={`bx ${darkMode ? "bx-sun" : "bx-moon"}`}></i>
        </span>
      </div>

      <header>
        <i 
          className="bx bx-left-arrow-alt"
          onClick={() => setWeather(null)}
        ></i>
        Today's Weather
      </header>

      {!weather && (
        <section className="input-part">
          {infoMessage && (
            <p className={`info-txt ${loading ? "pending" : "error"}`}>
              {infoMessage}
            </p>
          )}
          <div className="content">
            <input
              type="text"
              value={city}
              onChange={handleCityInput}
              placeholder="Enter City Name"
            />
            <div className="separator"></div>
            <button onClick={fetchWeatherByLocation}>Location auto-detect</button>
            <button onClick={fetchWeatherByCity}>Get Weather</button>
          </div>
        </section>
      )}

      {weather && (
        <div className="card">
          <img src={getWeatherIcon(weather)} alt="Weather Icon" />
          <div className="card-content">
            <div className="temp">
              <span className="numb">{Math.floor(weather.main.temp)}</span>
              <span className="deg">°</span>C
            </div>
            <div className="weather">{weather.weather[0].description}</div>
            <div className="location">
              <i className="bx bx-map"></i>
              <span>
                {weather.name}, {weather.sys.country}
              </span>
            </div>
          </div>
          <div className="bottom-details">
            <div className="column feels">
              <i className="bx bxs-thermometer"></i>
              <div className="details">
                <div className="temp">
                  <span className="numb-2">{Math.floor(weather.main.feels_like)}</span>
                  <span className="deg">°</span>C
                </div>
                <p>Feels like</p>
              </div>
            </div>
           
            <div className="column humidity">
              <i className="bx bxs-droplet-half"></i>
              <div className="details">
                <span>{weather.main.humidity}%</span>
                <p>Humidity</p>
              </div>
            </div>
         
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
