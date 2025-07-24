import React from "react";

function BalanceSheet({ transactions }) {
  console.log("transactions in BalanceSheet", transactions);

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const netCashflow = totalIncome - totalExpense;

  const categorySummary = {};
  transactions.forEach((t) => {
    if (!t.category) return;
    if (!categorySummary[t.category]) categorySummary[t.category] = 0;
    if (t.type === "Income")
      categorySummary[t.category] += Number(t.amount) || 0;
    else if (t.type === "Expense")
      categorySummary[t.category] -= Number(t.amount) || 0;
  });

  return (
    <div style={{ margin: "2rem" }}>
      <h2>Balance Sheet / Summary</h2>
      <p>
        <strong>Total Income:</strong> {isNaN(totalIncome) ? 0 : totalIncome}
      </p>
      <p>
        <strong>Total Expense:</strong> {isNaN(totalExpense) ? 0 : totalExpense}
      </p>
      <p>
        <strong>Net Cashflow:</strong> {isNaN(netCashflow) ? 0 : netCashflow}
      </p>

      <h3>By Category</h3>
      <ul>
        {Object.entries(categorySummary).map(([cat, value]) => (
          <li key={cat}>
            {cat}: {isNaN(value) ? 0 : value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BalanceSheet;
