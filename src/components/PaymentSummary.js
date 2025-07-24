import React from "react";

const PaymentSummary = ({ propertyList, transactions }) => {
  // 统计房源支付状态
  console.log("transactions in PaymentSummary", transactions);
  const paidCount = propertyList.filter((item) => item.isPaid).length;
  const unpaidCount = propertyList.length - paidCount;

  // 统计交易流水总金额（假设每条有 amount 字段，正负都算）
  const totalTransaction = transactions.reduce(
    (sum, t) => sum + Number(t.amount || 0),
    0
  );

  return (
    <div className="payment-summary">
      <h2>📊 Payment Summary</h2>
      <p>✅ Paid: {paidCount}</p>
      <p>❌ Unpaid: {unpaidCount}</p>
      <p>💰 Transaction Total: {totalTransaction}</p>
    </div>
  );
};

export default PaymentSummary;
