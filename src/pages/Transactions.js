import React, { useState } from "react";
import transactionsData from "../data/transactions";
import properties from "../data/propertyData";

const Transactions = () => {
  const [transactions, setTransactions] = useState(transactionsData);

  // 用于新增收支
  const [form, setForm] = useState({
    propertyId: properties[0]?.id || "",
    type: "expense",
    category: "",
    amount: "",
    currency: "EUR",
    date: "",
    description: "",
  });

  // 简单分类选项
  const categories = [
    "rent",
    "loan",
    "utility",
    "management",
    "repair",
    "other"
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.amount || !form.date || !form.category) return;
    const newTx = { ...form, id: Date.now(), amount: Number(form.amount) };
    setTransactions([newTx, ...transactions]);
    setForm({
      propertyId: properties[0]?.id || "",
      type: "expense",
      category: "",
      amount: "",
      currency: "EUR",
      date: "",
      description: "",
    });
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>收支明细表（Transactions）</h2>
      <form onSubmit={handleAdd} style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        <select name="propertyId" value={form.propertyId} onChange={handleChange}>
          {properties.map(p => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="income">收入</option>
          <option value="expense">支出</option>
        </select>
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">选择类别</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input type="number" name="amount" placeholder="金额" value={form.amount} onChange={handleChange} style={{ width: 80 }} />
        <select name="currency" value={form.currency} onChange={handleChange}>
          <option value="EUR">€</option>
          <option value="CNY">¥</option>
        </select>
        <input type="date" name="date" value={form.date} onChange={handleChange} style={{ width: 130 }} />
        <input type="text" name="description" placeholder="备注" value={form.description} onChange={handleChange} style={{ width: 120 }} />
        <button type="submit">添加</button>
      </form>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>房产</th>
            <th>类型</th>
            <th>类别</th>
            <th>金额</th>
            <th>币种</th>
            <th>日期</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{properties.find(p => p.id == tx.propertyId)?.title || tx.propertyId}</td>
              <td>{tx.type === "income" ? "收入" : "支出"}</td>
              <td>{tx.category}</td>
              <td style={{ textAlign: "right" }}>{tx.amount}</td>
              <td>{tx.currency}</td>
              <td>{tx.date}</td>
              <td>{tx.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;