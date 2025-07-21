import React, { useState, useEffect } from "react";
import "../styles/AddPropertyForm.css";

function AddPropertyForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [rent, setRent] = useState("");
  const [deposit, setDeposit] = useState("");
  const [image, setImage] = useState("");

  // 新增：贷款相关字段
  const [loanAmount, setLoanAmount] = useState("");
  const [loanMonths, setLoanMonths] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 自动计算月供
  useEffect(() => {
    if (
      loanAmount &&
      loanMonths &&
      !isNaN(loanAmount) &&
      !isNaN(loanMonths) &&
      Number(loanMonths) !== 0
    ) {
      setMonthlyPayment((Number(loanAmount) / Number(loanMonths)).toFixed(2));
    }
  }, [loanAmount, loanMonths]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !location.trim() || !rent.trim() || !deposit.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    const newProperty = {
      id: Date.now(),
      title,
      location,
      rent,
      deposit,
      isPaid: false,
      image,
      loan: {
        amount: Number(loanAmount) || 0,
        months: Number(loanMonths) || 0,
        monthlyPayment: Number(monthlyPayment) || 0,
      },
      // 其它字段如 currency、tenant、rentRecords 可以后续加入
    };

    setTimeout(() => {
      onAdd(newProperty);

      setTitle("");
      setLocation("");
      setRent("");
      setDeposit("");
      setImage("");
      setLoanAmount("");
      setLoanMonths("");
      setMonthlyPayment("");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="add-property-form">
      {error && <p className="error-message">{error}</p>}

      <input
        type="text"
        placeholder="Property Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rent"
        value={rent}
        onChange={(e) => setRent(e.target.value)}
      />
      <input
        type="number"
        placeholder="Deposit"
        value={deposit}
        onChange={(e) => setDeposit(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      {/* 贷款信息 */}
      <h3>Loan Info</h3>
      <input
        type="number"
        name="loanAmount"
        placeholder="Loan Amount"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
      />
      <input
        type="number"
        name="loanMonths"
        placeholder="Months"
        value={loanMonths}
        onChange={(e) => setLoanMonths(e.target.value)}
      />
      <input
        type="number"
        name="monthlyPayment"
        placeholder="Monthly Payment"
        value={monthlyPayment}
        onChange={(e) => setMonthlyPayment(e.target.value)}
        readOnly //
      />

      <button type="submit" className="primary" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Add Property"}
      </button>
    </form>
  );
}

export default AddPropertyForm;
