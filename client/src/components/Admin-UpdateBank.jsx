// BankAddForm.js
import "./CSS/Admin-UpdateUser.css";
import Swal from "sweetalert2";
import { useState } from "react";

const BankAddForm = ({ Bank, onsave, editbank }) => {
  const [bankData, setBankData] = useState({
    name: Bank.name,
    logo: Bank.logo,
    link: Bank.link,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save the changes.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then((result) => {
      if (result.isConfirmed) {
        editbank(bankData);
        onsave(); // Close the popup window after submission
      }
    });
  };
  return (
    <div className="user-edit-form-container">
      <div className="user-edit-form">
        <h2>Update Bank</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={bankData.name}
              onChange={handleChange}
              placeholder="Bank Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="logo">Logo:</label>
            <input
              type="text"
              id="logo"
              name="logo"
              value={bankData.logo}
              onChange={handleChange}
              placeholder="Logo URL"
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">Link:</label>
            <input
              type="text"
              id="link"
              name="link"
              value={bankData.link}
              onChange={handleChange}
              placeholder="Bank Website Link"
            />
          </div>
          <button type="submit" className="saveupdate-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default BankAddForm;
