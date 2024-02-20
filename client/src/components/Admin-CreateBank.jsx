// BankForm.js

import { useState } from "react";

const BankForm = ({ onClose, getAllBanksData }) => {
  const [category, setCategory] = useState("govt"); // Default to government bank
  const [logo, setLogo] = useState(null); // Use null instead of an empty string
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('category', category);
      formData.append('logo', logo); // Append the logo file to formData
      formData.append('name', name);
      formData.append('link', link);

      const response = await fetch("http://localhost:5000/api/admin/banks/add", {
        method: "POST",
        headers: {
          Authorization: AuthorizationToken,
        },
        body: formData,
      });
      
      if (response.ok) {
        alert('Bank added successfully!');
        getAllBanksData();
        onClose();
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to add bank');
      }
    } catch (error) {
      console.error("Error adding bank:", error);
      alert('Failed to add bank. Please try again.');
    }
  };

  return (
    <div className="bank-form-container">
      <div className="bank-form">
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
        <h2>Add Bank</h2>
        <form onSubmit={handleSubmit}>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="govt">Government</option>
            <option value="pvt">Private</option>
          </select>
          <input
            type="file" // Change input type to file
            accept="image/*"
            onChange={(e) => setLogo(e.target.files[0])} // Update logo state with selected file
          />
          <input
            type="text"
            placeholder="Bank Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bank Link URL"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <button type="submit">Add Bank</button>
        </form>
      </div>
    </div>
  );
};

export default BankForm;
