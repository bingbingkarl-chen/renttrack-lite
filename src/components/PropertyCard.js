// src/components/PropertyCard.js
import { useState } from "react";
import "../styles/PropertyCard.css";

export default function PropertyCard({ property }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="property-card">
      <div className="card-header" onClick={() => setIsOpen(!isOpen)}>
        <h2>{property.name}</h2>
        <p>{property.address}</p>
        <button>{isOpen ? "Hide Details" : "Show Details"}</button>
      </div>

      {isOpen && (
        <div className="card-details">
          <p>
            <strong>Monthly Rent:</strong> €{property.rent}
          </p>
          <p>
            <strong>Landlord:</strong> {property.landlord}
          </p>
          <p>
            <strong>Contract:</strong> {property.contractStart} -{" "}
            {property.contractEnd}
          </p>
          <p>
            <strong>Tenant:</strong> {property.tenantContact}
          </p>
        </div>
      )}
    </div>
  );
}
