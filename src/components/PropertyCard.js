// src/components/PropertyCard.js
import React from "react";
import "../styles/PropertyCard.css";
const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <img src={property.image} alt={property.title} />
      <h3>{property.title}</h3>
      <p>{property.location}</p>
      <p>Rent: {property.rent}</p>
      <p>Deposit: {property.deposit}</p>
      <p>
        Status:{" "}
        {property.isPaid ? (
          <span style={{ color: "green" }}>✅ Paid</span>
        ) : (
          <span style={{ color: "red" }}>❌ Unpaid</span>
        )}
      </p>
    </div>
  );
};

export default PropertyCard;
