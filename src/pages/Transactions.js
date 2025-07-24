import React, { useState } from "react";

function Transactions({ propertyList, transactions, setTransactions }) {
  const [form, setForm] = useState({
    type: "Income",
    category: "",
    amount: "",
    currency: "EUR",
    property: "",
    date: "",
    note: "",
  });
  console.log("Transactions页面的transactions", transactions);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.date) return;
    setTransactions((prev) => [
      ...prev,
      { ...form, amount: Number(form.amount) },
    ]);
    setForm({
      type: "Income",
      category: "",
      amount: "",
      currency: "EUR",
      property: "",
      date: "",
      note: "",
    });
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Transactions</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Rent/Repair)"
          value={form.category}
          onChange={handleChange}
          style={{ marginLeft: 8 }}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          style={{ width: 80, marginLeft: 8 }}
        />
        <select
          name="currency"
          value={form.currency}
          onChange={handleChange}
          style={{ marginLeft: 8 }}
        >
          <option value="EUR">€</option>
          <option value="CNY">¥</option>
        </select>
        <select
          name="property"
          value={form.property}
          onChange={handleChange}
          style={{ marginLeft: 8 }}
        >
          <option value="">Select Property</option>
          {propertyList.map((p) => (
            <option key={p.id} value={p.title}>
              {p.title}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          style={{ marginLeft: 8 }}
        />
        <input
          type="text"
          name="note"
          placeholder="Note"
          value={form.note}
          onChange={handleChange}
          style={{ marginLeft: 8, width: 100 }}
        />
        <button type="submit" style={{ marginLeft: 8 }}>
          Add
        </button>
      </form>

      <table border="1" cellPadding="4" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Property</th>
            <th>Amount</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {!transactions || transactions.length === 0 ? (
            <tr>
              <td colSpan={6} align="center">
                No records
              </td>
            </tr>
          ) : (
            transactions.map((t, idx) => (
              <tr key={idx}>
                <td>{t.date}</td>
                <td>{t.type}</td>
                <td>{t.category}</td>
                <td>{t.property}</td>
                <td>
                  {t.currency}
                  {t.amount}
                </td>
                <td>{t.note}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
