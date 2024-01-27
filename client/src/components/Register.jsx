import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: ""
  });
  const [confpas, setconfpas] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if ( name == 'cpassword' ) setconfpas(value);
    else {
      setUser({
        ...user,
        [name]: value
      });
    }
  }

  return (
    <div id='registerpage'>
      <h2>Hello!</h2>
      <p><span>Create Your Account</span></p>
      <form action="" className="login-form">
        <input type="text" name='username' placeholder='Enter your Name' onChange={handleChange} />
        <input type="text" name='email' placeholder='Email-Id' onChange={handleChange} />
        <input type="text" name='phone' placeholder='Phone number' onChange={handleChange} />
        <input type="password" name='password' placeholder='Password' onChange={handleChange} />
        <input type="password" name= 'cpassword' placeholder='Confirm Password' onChange={handleChange} />
        <button id="registerbtn" type='submit'>Register</button>
      </form>
      <p>Already have an account? <Link to="/">LOGIN</Link></p>
    </div>
  )
}
