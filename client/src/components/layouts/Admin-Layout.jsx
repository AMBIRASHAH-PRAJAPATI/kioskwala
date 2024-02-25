import { useState } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { FaUser, FaPiggyBank, FaHome } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { MdHomeRepairService } from "react-icons/md";
import "./Admin-Layout.css";

export default function AdminLayout() {
  const { user, isLoading } = useAuth();
  const [isNavOpen, setNavOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (!user.isAdmin) {
    Navigate("/");
  }

  const toggleNav = () => {
    if (window.innerWidth < 768) {
      const movnav = document.getElementById("admin-navlist");
  
      if (!isNavOpen) {
        movnav.classList.add("admin-nav-open");
      } else {
        movnav.classList.remove("admin-nav-open");
      }
      
      setNavOpen(!isNavOpen);
      console.log(isNavOpen);
    }
  };
  
  


  return (
    <div id="Admin-Panel">
      <div className="admin-sidebar">
        <header className="admin-header">
          <div className="mainlogo" id="admintop">
            <NavLink to="/">
              <img src="/assets/Kioskwalalogo.png" alt="Kioskwala" />
            </NavLink>
            <div id="opennav" onClick={toggleNav} className={isNavOpen ? "closenav" : ""} ></div>
          </div>
          <nav id="admin-navlist">
            <ul>
              <li>
                <NavLink to="/admin/users" onClick={toggleNav}>
                  <FaUser /> Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/banks" onClick={toggleNav}>
                  <FaPiggyBank /> Banks
                </NavLink>
              </li>
              <li>
                <NavLink to="/" onClick={toggleNav}>
                  <FaHome />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" onClick={toggleNav}>
                  <MdHomeRepairService /> Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/logout" onClick={toggleNav}>
                  <BiLogOut /> Logout{" "}
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-hero">
          <h1>DashBoard</h1>
          <span>User / Banks</span>
        </div>
        <Outlet />
      </div>
    </div>
  );
}