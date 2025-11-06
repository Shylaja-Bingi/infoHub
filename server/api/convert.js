export default function handler(req, res) {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  if (from.toUpperCase() !== "INR") {
    return res.status(400).json({ error: "Only INR is supported as 'from'" });
  }

  const MOCK_RATES = { USD: 0.012, EUR: 0.011 };

  const rate = MOCK_RATES[to.toUpperCase()];
  if (!rate) return res.status(400).json({ error: "Unsupported currency" });

  const converted = (parseFloat(amount) * rate).toFixed(2);

  res.status(200).json({
    from: from.toUpperCase(),
    to: to.toUpperCase(),
    amount: parseFloat(amount),
    converted: parseFloat(converted),
  });
}
