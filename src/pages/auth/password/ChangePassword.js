import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const userId = location.state?.userId;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:3000/karyawan/reset-password",
        {
          userId,
          newPassword: password,
        }
      );

      if (response.data.message === "Password has been reset") {
        alert("Password has been reset successfully");
        navigate("/");
      } else {
        setMessage(response.data.error || "Failed to reset password");
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="m-auto w-full h-screen p-5">
      <form className="form flex flex-col w-full mt-40" onSubmit={handleSubmit}>
        <h1
          className="text-4xl font-bold text-center mb-10"
          style={{ color: "#040F4D" }}
        >
          Buat Password baru
        </h1>
        <p className="text-center mb-5 text-lg">
          Password baru harus berbeda dari password sebelumnya.
        </p>
        <input
          type="password"
          style={{ borderRadius: "60px" }}
          placeholder="Ketikkan Password Baru"
          className="input mx-auto w-96 p-5 h-16 border-2 border-black mt-5 mb-8"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="password"
          style={{ borderRadius: "60px" }}
          placeholder="Konfirmasi Password"
          className="input mx-auto w-96 p-5 h-16 border-2 border-black mt-0 mb-12"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        {message && <p className="text-center text-red-600">{message}</p>}
        <button
          type="submit"
          style={{
            borderRadius: "20px",
            fontWeight: "700",
            backgroundColor: "#040F4D",
          }}
          className="button p-5 w-48 m-10 mx-auto text-white rounded-3 cursor-pointer"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
