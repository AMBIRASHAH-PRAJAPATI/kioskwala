import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "./CSS/NavBar.css";
import { useAuth } from "../store/auth";

export default function Navbar() {
  const { isLoggedIn, user } = useAuth();
  const [isNavOpen, setNavOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate instead of useHistory

  const handleScroll = () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleNav = () => {
    if (window.innerWidth < 704) {
      const navbar = document.querySelector(".navbar");
      const movnav = document.getElementById("navigationlist");
      
      if (!isNavOpen) {
        movnav.style.display = "block";
        document.body.style.overflow = "hidden"; // Disable scrolling
      } else {
        movnav.style.display = "none";
        document.body.style.overflow = "auto"; // Enable scrolling
      }
  
      if(window.scrollY == 0) {navbar.classList.toggle("scrolled");}
  
      setNavOpen(!isNavOpen);
    }
  };
  
  

  const handleServicesClick = () => {
    toggleNav();
    if (isLoggedIn) {
      navigate("/services"); // Use navigate instead of history.push
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="navbar">
      <div className="mainlogo">
        <NavLink to="/">
          <img src="/assets/Kioskwalalogo.png" alt="Kioskwala" />
        </NavLink>
      </div>
      <nav>
        <ul id="navigationlist" className={isNavOpen ? "closenav" : ""}>
          <li className="navitem">
            <NavLink to="/" onClick={toggleNav}> Home</NavLink>
          </li>
          <li className="navitem" onClick={handleServicesClick}>
              Services
          </li>
          {isLoggedIn ? (
            <>
              {user.isAdmin && (
                <li className="navitem">
                  <NavLink to="/admin" onClick={toggleNav}> Admin Panel </NavLink>
                </li>
              )}
              <li className="navitem">
                <NavLink to="/logout" onClick={toggleNav}> Logout </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="navitem">
                <NavLink to="/login" onClick={toggleNav}> Login </NavLink>
              </li>
              <li className="navitem">
                <NavLink to="/register" onClick={toggleNav}> Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
        <div id="opennav" className={isNavOpen ? "closenav" : ""} onClick={toggleNav}></div>
      </nav>
    </div>
  );
}

