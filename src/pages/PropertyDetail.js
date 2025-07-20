import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/PropertyDetail.css";

const getCurrencySymbol = (currency) => {
  if (currency === "EUR") return "€";
  if (currency === "CNY") return "¥";
  return "";
};

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
        <strong>Rent:</strong> {getCurrencySymbol(property.currency)}
        {property.rent}
      </p>
      <p>
        <strong>Deposit:</strong> {getCurrencySymbol(property.currency)}
        {property.deposit}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {property.isPaid ? (
          <span style={{ color: "green" }}>✅ Paid</span>
        ) : (
          <span style={{ color: "red" }}>❌ Unpaid</span>
        )}
      </p>

      <div className="rent-records-table">
        <table>
          <thead>
            <tr>
              {property.rentRecords?.map((rec) => (
                <th key={rec.month}>{rec.month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {property.rentRecords?.map((rec, idx) => (
                <td
                  key={rec.month}
                  style={{
                    background: rec.paid ? "#d2ffd2" : "#ffdede",
                    cursor: "pointer",
                    textAlign: "center",
                    fontWeight: "bold",
                    borderRadius: 4,
                  }}
                  onClick={() => onToggleRentRecord(property.id, idx)}
                >
                  {rec.paid ? "✅" : "❌"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>
    </div>
  );
};

export default PropertyDetail;
