import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";

// Authentication
import Login from "./pages/auth/LoginPage";

// Password
import ForgotPassword from "./pages/auth/password/ForgotPassword";
import OTP from "./pages/auth/password/OTP";
import ChangePassword from "./pages/auth/password/ChangePassword";

// User Pages
import Homepage from "./pages/user/Homepage";
import HomepageHp from "./components/homepage/hp/HomepageHp";
import HistoryLogActivity from "./pages/user/HistoryLogActivity";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Divisi from "./pages/admin/Divisi";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/OTP" element={<OTP />} />
      <Route path="/ChangePassword" element={<ChangePassword />} />

      <Route path="/Homepage" element={<Homepage />} />
      <Route path="/HomepageHp" element={<HomepageHp />} />
      <Route path="/HistoryLogActivity" element={<HistoryLogActivity />} />

      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Divisi" element={<Divisi />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
