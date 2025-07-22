import React from "react";

// 假定 transactions 是 props 传入的数组，每条包括 type(收入/支出)、category、amount、currency、property、date
function BalanceSheet({ transactions }) {
  // 汇总
  const totalIncome = transactions
    .filter((t) => t.type === "收入")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "支出")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const cashflow = totalIncome - totalExpense;

  // 可以按分类、房产等再细分汇总

  return (
    <div style={{ margin: "2rem" }}>
      <h2>资产负债表 / 收支总览</h2>
      <p>
        <strong>总收入：</strong> {totalIncome}
      </p>
      <p>
        <strong>总支出：</strong> {totalExpense}
      </p>
      <p>
        <strong>月现金流：</strong> {cashflow}
      </p>
      {/* 这里可以继续补充：资产、负债、明细分类汇总等 */}
    </div>
  );
}

export default BalanceSheet;
