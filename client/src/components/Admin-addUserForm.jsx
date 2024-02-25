import { useState } from "react";
import Swal from "sweetalert2";

const UserAddForm = ({ adduser }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
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
        adduser(user); // Assuming this function correctly handles API call
      }
    });
  };

  return (
    <div className="user-edit-form-container">
      <div className="user-edit-form">
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
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
              onChange={handleChange}
              value={user.email}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              onChange={handleChange}
              value={user.phone}
              placeholder="Phone"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={user.password}
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm Password:</label>
            <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={handleChange}
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

export default UserAddForm;
