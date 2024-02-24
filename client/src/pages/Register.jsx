import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


export default function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const { storeTokenInLS, API } = useAuth(); // geting funtion to store in local storage

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      if (response.ok) {
        storeTokenInLS(res_data.token);
        toast.success("registration  successful");
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/services");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log("register", error);
    }
  };

  return (
    <div id="logsinup">
      <div id="logboard">
        <div className="logleft">
          <div>
            <Link to="/">
              <img src="/assets/Kioskwalalogo.png" alt="KioskWala" />
            </Link>
          </div>
          <div id="registerpage">
            <h2>Hello!</h2>
            <p>
              <span>Create Your Account</span>
            </p>
            <form action="" onSubmit={handleSubmit} className="login-form">
              <input
                type="text"
                name="username"
                placeholder="Enter your Name"
                value={user.username}
                onChange={handleChange}
              />
              <input
                type="text"
                name="email"
                placeholder="Email-Id"
                value={user.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone number"
                value={user.phone}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={user.confirmPassword}
                onChange={handleChange}
              />
              <button id="registerbtn" type="submit">
                Register
              </button>
            </form>
            <p>
              Already have an account ? <Link to="/login">LOGIN</Link>
            </p>
          </div>
        </div>
        <div className="logright">
          <img id="logsinimg" src="/assets/logsinupright.svg" alt="" />
          <img id="logsinvector" src="/assets/Vector.svg" alt="Go" />
        </div>
      </div>
    </div>
  );
}
