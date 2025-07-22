import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/PropertyDetail.css";

// 币种符号工具
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

      {/* 押金记录 */}
      {property.depositRecord && (
        <div className="deposit-record">
          <strong>Deposit Record:</strong>
          <div>Paid: {property.depositRecord.paid ? "Yes" : "No"}</div>
          <div>Paid Date: {property.depositRecord.paidDate || "--"}</div>
          <div>Refunded: {property.depositRecord.refunded ? "Yes" : "No"}</div>
          <div>Refund Date: {property.depositRecord.refundDate || "--"}</div>
          {property.depositRecord.notes && (
            <div>Notes: {property.depositRecord.notes}</div>
          )}
        </div>
      )}

      {/* 租客信息 */}
      {property.tenant && property.tenant.name && (
        <div className="tenant-info">
          <strong>Tenant:</strong> {property.tenant.name}
          <br />
          <strong>Move-in Date:</strong> {property.tenant.moveInDate}
          {property.tenant.moveOutDate && (
            <>
              <br />
              <strong>Move-out Date:</strong> {property.tenant.moveOutDate}
            </>
          )}
        </div>
      )}

      {/* 租客历史 */}
      {property.tenantHistory && property.tenantHistory.length > 0 && (
        <div className="tenant-history">
          <h3>Tenant History</h3>
          <ul>
            {property.tenantHistory.map((t, idx) => (
              <li key={idx}>
                {t.name} | {t.moveInDate} → {t.moveOutDate || "Now"}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 贷款信息 */}
      {property.loan && (
        <div className="loan-info">
          <strong>Loan Info:</strong>
          <div>
            Total: {getCurrencySymbol(property.currency)}
            {property.loan.amount}
          </div>
          <div>Months: {property.loan.months}</div>
          <div>
            Monthly Payment: {getCurrencySymbol(property.currency)}
            {property.loan.monthlyPayment}
          </div>
        </div>
      )}

      {/* 收租记录表格 */}
      {property.rentRecords && property.rentRecords.length > 0 && (
        <div className="rent-records-table">
          <h4>Rent Records</h4>
          <table>
            <thead>
              <tr>
                {property.rentRecords.map((rec) => (
                  <th key={rec.month}>{rec.month}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {property.rentRecords.map((rec, idx) => (
                  <td
                    key={rec.month}
                    style={{
                      background: rec.paid ? "#d2ffd2" : "#ffdede",
                      cursor: "pointer",
                      textAlign: "center",
                      fontWeight: "bold",
                      borderRadius: 4,
                    }}
                    onClick={() =>
                      onToggleRentRecord && onToggleRentRecord(property.id, idx)
                    }
                  >
                    {rec.paid ? "✅" : "❌"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>
    </div>
  );
};

export default PropertyDetail;
