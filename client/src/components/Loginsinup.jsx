import React from "react";
import { Routes, Route } from "react-router-dom";
import "./loginsignup.css";
import Login from "./Login";
import Register from "./Register";

export default function Loginsinup() {
  return (
    <div id="main1st">
      <div className="logboard">
        <div className="logleft">
          <div>
            <img src="/public/assets/Kioskwalalogo.png" alt="Xerocodee." />
          </div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login/register" element={<Register />} />
          </Routes>
        </div>
        <div className="logright">
          <img id="logsinimg" src="/public/assets/logsinupright.svg" alt="" />
          <img id="vector" src="/public/assets/Vector.svg" alt="Go" />
        </div>
      </div>
    </div>
  );
}

// <Route path="/signinsec" element={<ProtectedRoute><Signin /></ProtectedRoute>} />
// line 25
