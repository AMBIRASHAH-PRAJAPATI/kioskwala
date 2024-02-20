/* eslint-disable react/prop-types */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import NotFoundPage from "./pages/NotFoundPage";
import { Logout } from "./pages/Logout";
import { useAuth } from "./store/auth";
import AdminLayout from "./components/layouts/Admin-Layout";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminBanks } from "./pages/Admin-Banks";






const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const App = () => {
  const { isLoggedIn, user } = useAuth(); // Added isAdmin

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {isLoggedIn ? (
          <>
            <Route path="/services" element={<Layout><Services /></Layout>} />
            {user.isAdmin && ( 
              <Route path="/admin" element={<AdminLayout />} >
              <Route index element={<AdminUsers />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="banks" element={<AdminBanks />} />
              </Route>
            )}
          </>
        ) : null }
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
