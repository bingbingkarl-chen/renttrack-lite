import React, { useState } from "react";

function AddPropertyForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [rent, setRent] = useState("");
  const [deposit, setDeposit] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim || !location || !rent || !deposit) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    const newProperty = {
      id: Date.now(),
      title,
      location,
      rent,
      deposit,
      isPaid: false,
      image,
    };

    onAdd(newProperty);

    // 清空表单
    setTitle("");
    setLocation("");
    setRent("");
    setDeposit("");
    setImage("");
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
        type="text"
        placeholder="Rent"
        value={rent}
        onChange={(e) => setRent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Deposit"
        value={deposit}
        onChange={(e) => setDeposit(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit">Add Property</button>
    </form>
  );
}

export default AddPropertyForm;
