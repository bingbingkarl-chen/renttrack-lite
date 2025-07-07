import React, { useState } from "react";
import "./App.css";

function App() {
  const [entries, setEntries] = useState([]);
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");

  const addEntry = () => {
    if (month && amount) {
      setEntries([...entries, { month, amount }]);
      setMonth("");
      setAmount("");
    }
  };

  return (
    <div className="App">
      <h1>RentTrack Lite</h1>
      <p style={{ fontStyle: "italic", color: "#555" }}>
        A simple rental income tracker created by Bingbing Karl-Chen 🌱
      </p>
      <div className="form">
        <input
          type="text"
          placeholder="Month (e.g. July)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount (€)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addEntry}>Add</button>
      </div>
      <div className="list">
        {entries.map((entry, index) => (
          <div key={index} className="item">
            <strong>{entry.month}:</strong> €{entry.amount}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
