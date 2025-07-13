import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import propertyData from "../data/propertyData";
import "../styles/PropertyDetail.css";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = propertyData.find((p) => p.id === Number(id));

  if (!property) {
    return <div className="detail-container">Property not found.</div>;
  }

  return (
    <div className="detail-container">
      <h2>{property.title}</h2>
      <img
        src={property.image}
        alt={property.title}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <p>Location: {property.location}</p>
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
      <span className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </span>
    </div>
  );
};

export default PropertyDetail;
