import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [classn, setclass] = useState("");

  const handleScroll = () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      if (window.scrollY > 0) {
        console.log("Adding scrolled class");
        navbar.classList.add("scrolled");
      } else {
        console.log("Removing scrolled class");
        navbar.classList.remove("scrolled");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let comenav = () => {
    let windowWidth = window.innerWidth;
    if (windowWidth <= 704) {
      let navdisplay = document.getElementById("navigationlist");
      if (classn !== "closenav") {
        setclass("closenav");
        navdisplay.style.display = "block";
      } else {
        setclass("");
        navdisplay.style.display = "none";
      }
    }
  };

  return (
    <header>
      <div className="navbar">
        <div id="mainlogo">
          <Link to="home">
            <img src="/public/assets/Kioskwalalogo.png" alt="Kioskwala" />
          </Link>
        </div>
        <nav>
          <ul id="navigationlist">
            <li className="navitem">
              <Link to="/" onClick={comenav}>
                Home
              </Link>
            </li>
            <li className="navitem">
              <Link to="/Service" onClick={comenav}>
                Service
              </Link>
            </li>
            <li className="navitem">
              <Link to="/Contact" onClick={comenav}>
                Contact
              </Link>
            </li>
            <li className="navitem">
              <Link to="/Login" onClick={comenav}>
                Login
              </Link>
            </li>
          </ul>
          <div id="opennav" className={classn} onClick={comenav}></div>
        </nav>
      </div>
    </header>
  );
}
