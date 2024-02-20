import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Loginsignup.css";
import {useAuth} from '../store/auth';
import { toast } from 'react-toastify';

const URl = "http://localhost:5000/api/auth/login"

export default function Login() {
  const [user, setUser] = useState({
    phone: "",
    password: "",
  }); 

  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth(); // geting funtion to store in local storage

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      
      const res_data = await response.json();
      if (response.ok) {
        toast.success("Login successfully"); // toast
        storeTokenInLS(res_data.token);
        setUser({ phone: "", password: ""});
        navigate("/services");

      } else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        setUser({ phone: "", password: ""});
      }
    } catch (error) {
      console.log("login", error );
    }
  }
  
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div id="logsinup">
      <div id="logboard">
        <div className="logleft">
          <div>
          <Link to="/"><img src="/assets/Kioskwalalogo.png" alt="KioskWala" /></Link>
          </div>
          <div id="loginpage" className="shadow">
          <h2>Welcome Again!</h2>
          <p>
            <span>Login To Your Account</span>
          </p>
          <form className="login-form" onSubmit={handleSubmit} >
            <input
              type="text"
              name="phone"
              placeholder="phone number"
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
            <button id="loginbtn" type="submit">
              Login
            </button>
          </form>
          <p>Dont have a account ? <Link to="/register">SIGN UP</Link></p>
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
