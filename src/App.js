// src/App.js

import React from "react";
import PropertyCard from "./components/PropertyCard";
import propertyData from "./data/propertyData";

function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>RentTrack Lite</h1>
      <div style={styles.cardContainer}>
        {propertyData.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
  },
  cardContainer: {
    display: "flex",
    gap: "2rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

export default App;
