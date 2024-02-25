import { useState } from "react";
import Swal from 'sweetalert2';

const UserEditForm = ({ user, edituser }) => {
  const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
    phone: user.phone
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
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
        edituser(userData);
      }
    });
    
  };

  return (
    <div className="user-edit-form-container">
      <div className="user-edit-form">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
        </div>
        <button type="submit" className="saveupdate-btn">Save</button>
      </form>
      
      </div>
    </div>
  );
};

export default UserEditForm;
