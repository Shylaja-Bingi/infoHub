import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";


export default function ConverterModule() {
  const [amount, setAmount] = useState("");
  const [toCurrency, setToCurrency] = useState("USD");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const convertCurrency = async () => {
    if (!amount) {
      setError("Please enter an amount");
      return;
    }

    setIsLoading(true);
    setError("");
    setData(null);

    await new Promise((resolve) => setTimeout(resolve, 500)); // simulate delay


    try {
      const res = await axios.get(`${BASE_URL}/convert?from=INR&to=${toCurrency}&amount=${amount}`);
      setData(res.data);
    } catch (err) {
      setError("Failed to convert currency");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h2>Currency Converter (INR → USD/EUR)</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount in INR"
        style={{ padding: "8px", borderRadius: "5px", width: "150px" }}
      />
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        style={{ padding: "8px", borderRadius: "5px", marginLeft: "10px" }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
      <button
        onClick={convertCurrency}
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
        Convert
      </button>

      {isLoading && <p>Converting...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div style={{ marginTop: "15px" }}>
          <p>
            {data.amount} INR = {data.converted} {data.to}
          </p>
        </div>
      )}
    </div>
  );
}
