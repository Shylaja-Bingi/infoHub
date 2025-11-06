import fetch from "node-fetch";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) return res.status(400).json({ error: "Please provide a city" });

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );

    if (!response.ok) {
      const errBody = await response.json();
      return res.status(response.status).json({ error: errBody.message });
    }

    const data = await response.json();
    res.status(200).json({
      location: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
