import { useState } from 'react';
import { Link } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div id="loginpage" className="shadow">
      <h2>Welcome Again!</h2>
      <p>
        <span>Login To Your Account</span>
      </p>
      <form className="login-form">
        <input
          type="text"
          name="phone"
          placeholder="phone number"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button id="loginbtn" type="submit">
          Login
        </button>
      </form>
      <p>Dont have a account <Link to="/register">SIGN UP</Link></p>
    </div>
  );
}
