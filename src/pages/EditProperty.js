import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProperty = ({ propertyList, onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = propertyList.find((item) => item.id === Number(id));

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    rent: "",
    deposit: "",
    image: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        location: property.location,
        rent: property.rent,
        deposit: property.deposit,
        image: property.image || "",
      });
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, location, rent, deposit } = formData;

    if (
      !title?.trim() ||
      !location?.trim() ||
      !rent?.trim() ||
      !deposit?.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setError(""); // clear previous error

    const updated = {
      ...property,
      ...formData,
    };

    onUpdate(id, updated);
    navigate("/");
  };

  if (!property) return <div>Property not found</div>;

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <h2>Edit Property</h2>

      {error && <p className="error-message">{error}</p>}

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
      />
      <input
        name="rent"
        value={formData.rent}
        onChange={handleChange}
        placeholder="Rent"
      />
      <input
        name="deposit"
        value={formData.deposit}
        onChange={handleChange}
        placeholder="Deposit"
      />
      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL (optional)"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditProperty;
