import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config"; // Make sure this file exists

export default function WeatherModule() {
  const [city, setCity] = useState("");         // city input from user
  const [data, setData] = useState(null);       // weather data
  const [isLoading, setIsLoading] = useState(false); // loading indicator
  const [error, setError] = useState("");       // error message

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }

    setIsLoading(true);  // show loading
    setError("");        // reset error
    setData(null);       // reset previous data

    try {
      // API call to production backend
      const res = await axios.get(`${BASE_URL}/weather?city=${city}`);
      setData(res.data); // set weather data
    } catch (err) {
      setError("Failed to load weather"); // show error if API fails
    } finally {
      setIsLoading(false); // hide loading
    }
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h2>Weather Information</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        style={{ padding: "8px", borderRadius: "5px", width: "200px" }}
      />
      <button
        onClick={fetchWeather}
        style={{
          marginLeft: "10px",
          padding: "8px 12px",
          borderRadius: "5px",
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
        }}
      >
        Get Weather
      </button>

      {/* Loading indicator */}
      {isLoading && <p>Loading weather...</p>}

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Weather data display */}
      {data && (
        <div style={{ marginTop: "15px" }}>
          <p>Location: {data.location}</p>
          <p>Temperature: {data.temperature}°C</p>
          <p>Condition: {data.description}</p>
          <p>Humidity: {data.humidity}%</p>
          <p>Wind Speed: {data.windSpeed} m/s</p>
        </div>
      )}
    </div>
  );
}
