import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditProperty.css";

const EditProperty = ({ propertyList, onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = propertyList.find((item) => item.id === Number(id));

  const [formData, setFormData] = useState({
    id: Number(id),
    title: "",
    location: "",
    rent: "",
    deposit: "",
    image: "",
    isPaid: false,
    tenantName: "",
    moveInDate: "",
    currency: "EUR",
    loanAmount: "",
    loanMonths: "",
    monthlyPayment: "",
    // 押金记录相关
    depositPaid: "true",
    depositPaidDate: "",
    depositRefunded: "false",
    depositRefundDate: "",
    depositNotes: "",
  });

  const [error, setError] = useState("");

  // 数据回显 property 到 formData
  useEffect(() => {
    if (property) {
      setFormData({
        id: property.id,
        title: property.title,
        location: property.location,
        rent: property.rent,
        deposit: property.deposit,
        image: property.image || "",
        isPaid: property.isPaid || false,
        tenantName: property.tenant?.name || "",
        moveInDate: property.tenant?.moveInDate || "",
        currency: property.currency || "EUR",
        loanAmount: property.loan?.amount || "",
        loanMonths: property.loan?.months || "",
        monthlyPayment: property.loan?.monthlyPayment || "",
        depositPaid: property.depositRecord
          ? property.depositRecord.paid
            ? "true"
            : "false"
          : "true",
        depositPaidDate: property.depositRecord?.paidDate || "",
        depositRefunded: property.depositRecord
          ? property.depositRecord.refunded
            ? "true"
            : "false"
          : "false",
        depositRefundDate: property.depositRecord?.refundDate || "",
        depositNotes: property.depositRecord?.notes || "",
      });
    }
  }, [property]);

  // 自动计算月供
  useEffect(() => {
    if (
      formData.loanAmount &&
      formData.loanMonths &&
      !isNaN(formData.loanAmount) &&
      !isNaN(formData.loanMonths) &&
      Number(formData.loanMonths) !== 0
    ) {
      setFormData((prev) => ({
        ...prev,
        monthlyPayment: (
          Number(prev.loanAmount) / Number(prev.loanMonths)
        ).toFixed(2),
      }));
    }
  }, [formData.loanAmount, formData.loanMonths]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      title,
      location,
      rent,
      deposit,
      image,
      isPaid,
      tenantName,
      moveInDate,
      currency,
      loanAmount,
      loanMonths,
      monthlyPayment,
      depositPaid,
      depositPaidDate,
      depositRefunded,
      depositRefundDate,
      depositNotes,
    } = formData;

    if (!title.trim() || !location.trim() || !rent.trim() || !deposit.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    const submitData = {
      id: property.id,
      title,
      location,
      rent,
      deposit,
      image: image || "",
      isPaid: isPaid || false,
      currency,
      tenant: {
        name: tenantName,
        moveInDate: moveInDate,
      },
      loan: {
        amount: Number(loanAmount) || 0,
        months: Number(loanMonths) || 0,
        monthlyPayment: Number(monthlyPayment) || 0,
      },
      depositRecord: {
        paid: depositPaid === "true",
        paidDate: depositPaidDate,
        refunded: depositRefunded === "true",
        refundDate: depositRefundDate,
        notes: depositNotes,
      },
      rentRecords: property.rentRecords || [],
    };

    onUpdate(submitData);
    navigate("/");
  };

  if (!property) return <div>Property not found.</div>;

  return (
    <form className="add-property-form" onSubmit={handleSubmit}>
      <h2>Edit Property</h2>
      {error && <p className="error-message">{error}</p>}

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />

      <input
        type="number"
        name="rent"
        placeholder="Rent"
        value={formData.rent}
        onChange={handleChange}
      />

      <input
        type="number"
        name="deposit"
        placeholder="Deposit"
        value={formData.deposit}
        onChange={handleChange}
      />

      {/* 押金记录 */}
      <h3>Deposit Record</h3>
      <label>
        Paid:
        <select
          name="depositPaid"
          value={formData.depositPaid}
          onChange={handleChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>
      <input
        type="date"
        name="depositPaidDate"
        value={formData.depositPaidDate}
        onChange={handleChange}
      />
      <label>
        Refunded:
        <select
          name="depositRefunded"
          value={formData.depositRefunded}
          onChange={handleChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>
      <input
        type="date"
        name="depositRefundDate"
        value={formData.depositRefundDate}
        onChange={handleChange}
      />
      <input
        type="text"
        name="depositNotes"
        placeholder="Notes"
        value={formData.depositNotes}
        onChange={handleChange}
      />

      {/* 贷款信息 */}
      <h3>Loan Info</h3>
      <input
        type="number"
        name="loanAmount"
        placeholder="Loan Amount"
        value={formData.loanAmount}
        onChange={handleChange}
      />
      <input
        type="number"
        name="loanMonths"
        placeholder="Months"
        value={formData.loanMonths}
        onChange={handleChange}
      />
      <input
        type="number"
        name="monthlyPayment"
        placeholder="Monthly Payment"
        value={formData.monthlyPayment}
        onChange={handleChange}
      />

      {/* 其它字段按需添加 */}

      <select name="currency" value={formData.currency} onChange={handleChange}>
        <option value="EUR">€</option>
        <option value="CNY">¥</option>
      </select>

      {/* 租客信息 */}
      <input
        type="text"
        name="tenantName"
        placeholder="Tenant Name"
        value={formData.tenantName}
        onChange={handleChange}
      />

      <input
        type="date"
        name="moveInDate"
        placeholder="Move-in Date"
        value={formData.moveInDate}
        onChange={handleChange}
      />

      <button type="submit" className="primary">
        Save
      </button>
    </form>
  );
};

export default EditProperty;
