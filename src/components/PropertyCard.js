// src/components/PropertyCard.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/PropertyCard.css";

const PropertyCard = ({ property, onTogglePaid, onDelete }) => {
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

      <div className="action-buttons">
        <button onClick={() => onTogglePaid(property.id)} className="primary">
          {property.isPaid ? "Mark as Unpaid" : "Mark as Paid"}
        </button>

        <button onClick={() => onDelete(property.id)} className="delete">
          🗑 Delete
        </button>

        <Link to={`/property/${property.id}`}>
          <button className="details">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
