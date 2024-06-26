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
import HistoryLogActivity from "./pages/user/HistoryLogActivity";

// Admin Pages
// Dashboard
import Dashboard from "./pages/admin/Dashboard";

// Divisi dan Project
import Divisi from "./pages/admin/Divisi";
import Project from "./pages/admin/Project";
import TambahKaryawan from "./pages/admin/divisi/TambahKaryawan";
import DetailedView from "./pages/admin/DetailedView";

// Shift
import Shift from "./pages/admin/Shift";

// Presensi
import Presensi from "./pages/admin/Presensi";

// Laporan
import Laporan from "./pages/admin/Laporan";

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
      <Route path="/HistoryLogActivity" element={<HistoryLogActivity />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Divisi" element={<Divisi />} />
      <Route path="/DetailedView" element={<DetailedView />} />
      <Route path="/Shift" element={<Shift />} />
      <Route path="/Project" element={<Project />} />
      <Route path="/TambahKaryawan" element={<TambahKaryawan />} />
      <Route path="/Presensi" element={<Presensi />} />
      <Route path="/Laporan" element={<Laporan />} />
      <Route path="/division/:divisionName" element={<DetailedView />} />{" "}
      {/* Add this route */}
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
