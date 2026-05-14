import Header from "./components/header";
import { useState, useEffect } from "react";
import "./App.css";
import { IoIosSearch } from "react-icons/io";
function Weatherapp() {
  const [cityData, setCityData] = useState("Delhi");
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const API_KEY = import.meta.env.VITE_API_KEY;
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityData}&appid=${API_KEY}&units=metric`,
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        console.log(data);
      });
  }, [cityData]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCityData(input); 
    }
  };
  const handleCityChange = (event) => {
    setInput(event.target.value);
  };
  return (
    <>
      <Header />
      <div className="searchbox">
        <IoIosSearch className="icon" />
        <input
          type="text"
          value={input}
          className="search"
          placeholder="Search city..."
          onChange={handleCityChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      {weather && weather.main && (
        <>
          <div className="weather-card">
            <h2 className="city">
              📍 {weather.name}, {weather.sys.country}
            </h2>

            <p>
              📅 {currentTime.toLocaleDateString()} | 🕒{" "}
              {currentTime.toLocaleTimeString()}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="weather-icon"
            />

            <h1 className="temp">🌡 {weather.main.temp}°C</h1>

            <p className="condition">{weather.weather[0].description}</p>

            <p>
              ⬇️ Min: {weather.main.temp_min}°C | ⬆️ Max:{" "}
              {weather.main.temp_max}°C
            </p>
          </div>

          <div className="other">
            <h3 className="humidity">💧 Humidity: {weather.main.humidity}%</h3>
            <h3 className="wind">🌬 Wind: {weather.wind.speed} km/h</h3>
            <h3 className="feelslike">
              🤔 Feels like: {weather.main.feels_like}°C
            </h3>
          </div>

          <div className="sun">
            <p>
              🌅 Sunrise:{" "}
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p>
              🌇 Sunset:{" "}
              {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>
        </>
      )}
    </>
  );
}
export default Weatherapp;
