// src/App.js
import "./styles/App.css";
import PropertyCard from "./components/PropertyCard";
import propertyData from "./data/propertyData";

function App() {
  return (
    <div className="App">
      <h1>RentTrack Lite</h1>
      {propertyData.map((property, index) => (
        <PropertyCard key={index} property={property} />
      ))}
    </div>
  );
}

export default App;
