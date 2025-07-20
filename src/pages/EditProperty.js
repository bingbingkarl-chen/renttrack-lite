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
  });

  const [error, setError] = useState("");

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
      });
    }
  }, [property]);

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
    } = formData;

    if (
      !title.trim() ||
      !location.trim() ||
      !rent.toString().trim() ||
      !deposit.toString().trim()
    ) {
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
      tenant: {
        name: tenantName,
        moveInDate: moveInDate,
      },
      rentRecords: property.rentRecords || [],
      currency,
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
      <label>
        Currency:&nbsp;
        <select
          name="currency"
          value={formData.currency}
          onChange={handleChange}
        >
          <option value="EUR">€</option>
          <option value="CNY">¥</option>
        </select>
      </label>

      <input
        type="text"
        name="image"
        placeholder="Image URL (optional)"
        value={formData.image}
        onChange={handleChange}
      />
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

      <button type="submit">Save</button>
    </form>
  );
};

export default EditProperty;
