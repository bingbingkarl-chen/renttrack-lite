// src/components/PropertyCard.js
import React from "react";
import "../styles/PropertyCard.css";
import { Link } from "react-router-dom";
const PropertyCard = ({ property, onTogglePaid }) => {
  return (
    <div className={`property-card ${property.isPaid ? "paid" : "unpaid"}`}>
      <img
        src={property.image}
        alt={property.title}
        className="property-image"
      />
      <div className={`status-badge ${property.isPaid ? "paid" : "unpaid"}`}>
        {property.isPaid ? "Paid" : "Unpaid"}
      </div>
      <h3>{property.title}</h3>
      <p>{property.location}</p>
      <p>
        <strong>{property.rent}</strong>
      </p>
      <p>{property.isPaid ? "✅ Paid" : "❌ Not Paid"}</p>
      <button onClick={() => onTogglePaid(property.id)}>
        {property.isPaid ? "Mark as Unpaid" : "Mark as Paid"}
      </button>
      <p className="property-snippet">
        {property.description ? property.description.slice(0, 50) + "..." : ""}
      </p>
    </div>
  );
};

export default PropertyCard;
