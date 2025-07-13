import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertyCard from "./components/PropertyCard";
import propertyData from "./data/propertyData";
import PropertyDetail from "./pages/PropertyDetail";
import "./styles/App.css";
import PaymentSummary from "./components/PaymentSummary";

function App() {
  const [propertyList, setPropertyList] = useState(() => {
    const savedData = localStorage.getItem("renttrack-data");
    return savedData ? JSON.parse(savedData) : propertyData;
  });

  useEffect(() => {
    localStorage.setItem("renttrack-data", JSON.stringify(propertyList));
  }, [propertyList]);

  const togglePaidStatus = (id) => {
    setPropertyList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isPaid: !item.isPaid } : item
      )
    );
  };

  return (
    <div className="app-container">
      <h1>RentTrack Lite</h1>
      <PaymentSummary propertyList={propertyList} />
      {propertyList.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onTogglePaid={togglePaidStatus}
        />
      ))}
    </div>
  );
}
export default App;
