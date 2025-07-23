import React from "react";

// Assume transactions is an array of objects: type('Income'/'Expense'), category, amount, currency, property, date
function BalanceSheet({ transactions }) {
  // Sum up income and expenses
  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const cashflow = totalIncome - totalExpense;

  // Optionally, summarize by category or property

  return (
    <div style={{ margin: "2rem" }}>
      <h2>Balance Sheet / Cashflow Overview</h2>
      <p>
        <strong>Total Income:</strong> {totalIncome}
      </p>
      <p>
        <strong>Total Expense:</strong> {totalExpense}
      </p>
      <p>
        <strong>Net Cashflow:</strong> {cashflow}
      </p>
      {/* You can add more detail here, such as assets, liabilities, category breakdowns, etc. */}
    </div>
  );
}

export default BalanceSheet;
