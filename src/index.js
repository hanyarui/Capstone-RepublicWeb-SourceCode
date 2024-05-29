import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";

// Authentication
import Login from "./pages/LoginPage";

// Password
import ForgotPassword from "./pages/password/ForgotPassword";
import OTP from "./pages/password/OTP";
import ChangePassword from "./pages/password/ChangePassword";

// User Pages
import Homepage from "./pages/Homepage";
import HistoryLogActivity from "./pages/HistoryLogActivity";

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
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
