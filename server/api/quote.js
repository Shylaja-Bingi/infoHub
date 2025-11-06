// ---------- QUOTE API ----------
const QUOTES = [
  { quote: "Believe in yourself!", author: "Anonymous" },
  { quote: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { quote: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
];

app.get("/quote", (req, res) => {
  const random = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  res.json(random);
});

