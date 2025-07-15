import React from "react";

const PaymentSummary = ({ propertyList }) => {
  const paidCount = propertyList.filter((item) => item.isPaid).length;
  const unpaidCount = propertyList.length - paidCount;

  return (
    <div className="payment-summary">
      <h2>📊 Payment Summary</h2>
      <p>✅ Paid: {paidCount}</p>
      <p>❌ Unpaid: {unpaidCount}</p>
    </div>
  );
};

export default PaymentSummary;
