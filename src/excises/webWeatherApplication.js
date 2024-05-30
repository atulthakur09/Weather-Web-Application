import React, { useState } from "react";
import axios from "axios";
import "../Styles.css";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchWeather = async () => {
    if (!search) return;

    setLoading(true);
    setError(null);

    const options = {
      method: "GET",
      url: "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather",
      params: { city: search },
      headers: {
        "X-RapidAPI-Key": "7eaaf95122msh632f2923b6388a0p1ec78fjsnfbeab73b1b52",
        "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setWeatherData(response.data);
    } catch (error) {
      setError("Error fetching weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Weather Web Application</h1>
      <label htmlFor="search">
        <input
          type="search"
          name="search"
          id="search"
          className="search-input"
          placeholder="Search location for..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      <Button onClick={searchWeather} disabled={loading || !search}>
        Search
      </Button>
      <FontAwesomeIcon icon={faCloud} />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {search && weatherData && (
        <div className="weather-container">
          <h2>Weather in {search}</h2>
          <p>
            <b>Temperature:</b> {weatherData.temp}°C
          </p>
          <p>
            <b>Humidity:</b> {weatherData.humidity}%
          </p>
          <p>
            <b>Wind Speed:</b> {weatherData.wind_speed} m/s
          </p>
        </div>
      )}
    </div>
  );
}
