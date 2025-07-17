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

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        location: property.location,
        rent: property.rent,
        deposit: property.deposit,
        image: property.image,
      });
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(id, formData);
    navigate("/");
  };

  if (!property) return <div>Property not found</div>;

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <h2>Edit Property</h2>
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
        placeholder="Image URL"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditProperty;
