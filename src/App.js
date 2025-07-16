import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PropertyCard from "./components/PropertyCard";
import propertyData from "./data/propertyData";
import PropertyDetail from "./pages/PropertyDetail";
import "./styles/App.css";
import PaymentSummary from "./components/PaymentSummary";
import AddPropertyForm from "./components/AddPropertyForm";

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

  const addProperty = (newProperty) => {
    const updatedList = [newProperty, ...propertyList];
    setPropertyList(updatedList);
    localStorage.setItem("renttrack-data", JSON.stringify(updatedList));
  };
  const handleDelete = (id) => {
    const filteredList = propertyList.filter((item) => item.id !== id);
    setPropertyList(filteredList);
    localStorage.setItem("renttrack-data", JSON.stringify(filteredList));
  };
  return (
    <div className="app-container">
      <h1>RentTrack Lite</h1>
      <PaymentSummary propertyList={propertyList} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <AddPropertyForm onAdd={addProperty} />
              <div className="property-list">
                {propertyList.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onTogglePaid={togglePaidStatus}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </>
          }
        />
        <Route
          path="/property/:id"
          element={<PropertyDetail propertyList={propertyList} />}
        />
      </Routes>
    </div>
  );
}

export default App;
