// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // npm install node-fetch
import 'dotenv/config'; // automatically loads .env


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

// ---------- WEATHER API ----------
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
console.log("Weather API Key:", OPENWEATHER_API_KEY);

console.log("Server directory:", process.cwd());
console.log("Environment variables:", process.env.OPENWEATHER_API_KEY);


app.get("/weather", async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "Please provide a city name" });

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${OPENWEATHER_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      const errBody = await response.json();
      return res.status(response.status).json({ error: errBody.message });
    }
    const data = await response.json();
    res.json({
      location: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// ---------- CURRENCY CONVERSION API ----------
const MOCK_RATES = { USD: 0.012, EUR: 0.011 }; // 1 INR -> USD/EUR

app.get("/convert", (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  if (from.toUpperCase() !== "INR" || !MOCK_RATES[to.toUpperCase()]) {
    return res.status(400).json({ error: "Invalid currency" });
  }

  const converted = (parseFloat(amount) * MOCK_RATES[to.toUpperCase()]).toFixed(2);

  res.json({
    from: from.toUpperCase(),
    to: to.toUpperCase(),
    amount: parseFloat(amount),
    converted: parseFloat(converted),
  });
});



// ---------- QUOTE API ----------
const QUOTES = [
  { quote: "Believe in yourself!", author: "Anonymous" },
  { quote: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { quote: "Don’t let yesterday take up too much of today.", author: "Will Rogers" }
];

app.get("/quote", (req, res) => {
  const random = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  res.json(random);
});


// ---------- Health check ----------
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "InfoHub API running" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
