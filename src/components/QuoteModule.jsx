import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";


export default function QuoteModule() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    setIsLoading(true);
    setError("");
    setData(null);

    await new Promise((resolve) => setTimeout(resolve, 500)); // simulate delay

    try {
      const res = await axios.get(`${BASE_URL}/quote`);
      setData(res.data);
    } catch (err) {
      setError("Failed to fetch quote");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h2>Motivational Quote Generator</h2>
      <button
        onClick={fetchQuote}
        style={{
          padding: "8px 12px",
          borderRadius: "5px",
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
        }}
      >
        Get Quote
      </button>

      {isLoading && <p>Loading quote...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div style={{ marginTop: "15px" }}>
          <p>"{data.quote}"</p>
          <p>- {data.author}</p>
        </div>
      )}
    </div>
  );
}
