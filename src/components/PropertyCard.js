// src/components/PropertyCard.js
import React from "react";

function PropertyCard({ property }) {
  return (
    <div
      style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}
    >
      <h2>{property.name}</h2>
      <p>
        <strong>Address:</strong> {property.address}
      </p>
      <p>
        <strong>Tenant:</strong> {property.tenant}
      </p>
      <p>
        <strong>Rent:</strong> €{property.rent}
      </p>
      <p>
        <strong>Lease:</strong> {property.leaseStart} → {property.leaseEnd}
      </p>
      <p>
        <strong>Status:</strong>
        {property.isPaid ? " ✅ Rent Paid" : " ❌ Rent Not Paid"}
      </p>
    </div>
  );
}

export default PropertyCard;
