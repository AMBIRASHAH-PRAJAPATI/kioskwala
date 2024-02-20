import { useState } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { FaUser, FaPiggyBank, FaHome } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { MdHomeRepairService } from "react-icons/md";
import "./Admin-Layout.css";

export default function AdminLayout() {
  const { user, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (!user.isAdmin) {
    Navigate("/");
  }

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div id="Admin-Panel">
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <header className="admin-header">
          <div id="mainlogo" onClick={handleSidebarToggle}>
            <NavLink to="/">
              <img src="/assets/Kioskwalalogo.png" alt="Kioskwala" />
            </NavLink>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users" onClick={handleSidebarToggle}>
                  <FaUser /> Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/banks" onClick={handleSidebarToggle}>
                  <FaPiggyBank /> Banks
                </NavLink>
              </li>
              <li>
                <NavLink to="/" onClick={handleSidebarToggle}>
                  <FaHome />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" onClick={handleSidebarToggle}>
                  <MdHomeRepairService /> Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/logout" onClick={handleSidebarToggle}>
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