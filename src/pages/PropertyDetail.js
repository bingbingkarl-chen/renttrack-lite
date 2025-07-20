import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/PropertyDetail.css";

const PropertyDetail = ({ propertyList, onToggleRentRecord }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = propertyList.find((item) => item.id === Number(id));

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
      <p>
        <strong>Location:</strong> {property.location}
      </p>
      <p>
        <strong>Rent:</strong> €{property.rent}
      </p>
      <p>
        <strong>Deposit:</strong> €{property.deposit}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {property.isPaid ? (
          <span style={{ color: "green" }}>✅ Paid</span>
        ) : (
          <span style={{ color: "red" }}>❌ Unpaid</span>
        )}
      </p>
      <div className="rent-records">
        <h4>Rent Records</h4>
        <div className="rent-record-list">
          {property.rentRecords?.map((rec, idx) => (
            <button
              key={rec.month}
              className={rec.paid ? "paid" : "unpaid"}
              onClick={() => onToggleRentRecord(property.id, idx)}
              style={{
                margin: "2px 4px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                background: rec.paid ? "#d2ffd2" : "#ffdede",
              }}
            >
              {rec.month} {rec.paid ? "✅" : "❌"}
            </button>
          ))}
        </div>
      </div>
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>
    </div>
  );
};

export default PropertyDetail;
