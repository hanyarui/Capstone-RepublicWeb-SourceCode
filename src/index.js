import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";

// Authentication
import Login from "./pages/auth/LoginPage";
import ForgotPassword from "./pages/auth/password/ForgotPassword";
import OTP from "./pages/auth/password/OTP";
import ChangePassword from "./pages/auth/password/ChangePassword";

// User Pages
import Homepage from "./pages/user/Homepage";
import HistoryLogActivity from "./pages/user/HistoryLogActivity";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Divisi from "./pages/admin/Divisi";
import Project from "./pages/admin/Project";
import TambahKaryawan from "./pages/admin/divisi/TambahKaryawan";
import DetailDivisi from "./pages/admin/DetailDivisi";
import DetailProject from "./pages/admin/DetailProject"; // Import the new DetailProject component
import Shift from "./pages/admin/Shift";
import Presensi from "./pages/admin/Presensi";
import Laporan from "./pages/admin/Laporan";
import Profile from "./pages/admin/Profile";

import reportWebVitals from "./reportWebVitals";
import PrivateRoute from "./components/PrivateRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/OTP" element={<OTP />} />
      <Route path="/ChangePassword" element={<ChangePassword />} />

      <Route
        path="/Homepage"
        element={
          <PrivateRoute>
            <Homepage />
          </PrivateRoute>
        }
      />
      <Route
        path="/HistoryLogActivity"
        element={
          <PrivateRoute>
            <HistoryLogActivity />
          </PrivateRoute>
        }
      />
      <Route
        path="/Dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/Profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/Divisi"
        element={
          <PrivateRoute>
            <Divisi />
          </PrivateRoute>
        }
      />
      <Route
        path="/Shift"
        element={
          <PrivateRoute>
            <Shift />
          </PrivateRoute>
        }
      />
      <Route
        path="/Project"
        element={
          <PrivateRoute>
            <Project />
          </PrivateRoute>
        }
      />
      <Route
        path="/TambahKaryawan"
        element={
          <PrivateRoute>
            <TambahKaryawan />
          </PrivateRoute>
        }
      />
      <Route
        path="/Presensi"
        element={
          <PrivateRoute>
            <Presensi />
          </PrivateRoute>
        }
      />
      <Route
        path="/Laporan"
        element={
          <PrivateRoute>
            <Laporan />
          </PrivateRoute>
        }
      />
      <Route
        path="/division/:divisionName"
        element={
          <PrivateRoute>
            <DetailDivisi />
          </PrivateRoute>
        }
      />
      <Route
        path="/DetailProject/:projectId"
        element={
          <PrivateRoute>
            <DetailProject />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
