import React from "react";

const PaymentSummary = ({ propertyList }) => {
  const paidCount = propertyList.filter((p) => p.isPaid).length;
  const unpaidCount = propertyList.length - paidCount;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        marginBottom: "20px",
        borderRadius: "8px",
      }}
    >
      <h3>💰 Rent Payment Overview</h3>
      <p>• Paid: {paidCount}</p>
      <p>• Unpaid: {unpaidCount}</p>
    </div>
  );
};

export default PaymentSummary;
