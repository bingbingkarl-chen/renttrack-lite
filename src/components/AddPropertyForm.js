import React, { useState } from "react";

const AddPropertyForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [rent, setRent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !rent || !image) return;

    const newProperty = {
      id: Date.now(),
      title,
      rent,
      image,
      isPaid: false,
    };

    onAdd(newProperty);
    setTitle("");
    setRent("");
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Property title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Monthly rent"
        value={rent}
        onChange={(e) => setRent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit">Add Property</button>
    </form>
  );
};

export default AddPropertyForm;
