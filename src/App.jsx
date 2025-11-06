import { useState } from "react";
import WeatherModule from "./components/WeatherModule.jsx";
import ConverterModule from "./components/ConverterModule.jsx";
import QuoteModule from "./components/QuoteModule.jsx";

const BASE_URL = "https://infohub-backend-cwwofn2q2-shylajabingi20-6931s-projects.vercel.app";


export default function App() {
  const [activeTab, setActiveTab] = useState("Weather");

  const tabStyle = (tab) => ({
    padding: "10px 20px",
    marginRight: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: activeTab === tab ? "#4CAF50" : "#ddd",
    color: activeTab === tab ? "white" : "black",
    border: "none",
    transition: "0.3s",
  });

  return (
    <div style = {{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}
    >
    <div
      style={{
        display: "flex",
        justifyContent: "center", // horizontal centering
        alignItems: "center",     // vertical centering
        height: "100vh",          // full viewport height
        width: "100vw",           // full viewport width
        flexDirection: "column",  // stack modules vertically
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>InfoHub SPA</h1>

      <div style={{ 
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap", // allow wrapping
        gap: "10px"     // space between buttons

        }}>
        <button style={tabStyle("Weather")} onClick={() => setActiveTab("Weather")}>
          Weather
        </button>
        <button style={tabStyle("Converter")} onClick={() => setActiveTab("Converter")}>
          Currency Converter
        </button>
        <button style={tabStyle("Quote")} onClick={() => setActiveTab("Quote")}>
          Quote Generator
        </button>
      </div>

      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          minHeight: "250px",
        }}
      >
        {activeTab === "Weather" && <WeatherModule />}
        {activeTab === "Converter" && <ConverterModule />}
        {activeTab === "Quote" && <QuoteModule />}
      </div>
    </div>
    </div>
  );
}
