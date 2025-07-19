import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditProperty.css";

const EditProperty = ({ propertyList, onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = propertyList.find((item) => item.id === Number(id));

  const [formData, setFormData] = useState({
    id: Number(id), // 🔧 注意保留 id
    title: "",
    location: "",
    rent: "",
    deposit: "",
    image: "",
    isPaid: false,
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

    const { title, location, rent, deposit } = formData;

    if (!title.trim() || !location.trim() || !rent.trim() || !deposit.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    onUpdate(formData); // ✅ 传入包含 id 的完整对象
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
        type="text"
        name="rent"
        placeholder="Rent"
        value={formData.rent}
        onChange={handleChange}
      />

      <input
        type="text"
        name="deposit"
        placeholder="Deposit"
        value={formData.deposit}
        onChange={handleChange}
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL (optional)"
        value={formData.image}
        onChange={handleChange}
      />

      <button type="submit">Save</button>
    </form>
  );
};

export default EditProperty;
