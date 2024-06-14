import React, { useState } from "react";
import axios from "axios";

const PreForgot = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://republikweb-cp-backend.vercel.app/v1/karyawan/request-reset-password",
        { email }
      );
      setMessage("OTP has been sent to your email.");
    } catch (error) {
      setMessage("Failed to send OTP. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="m-auto w-full h-screen p-5">
      <form className="form flex flex-col w-full mt-40" onSubmit={handleSubmit}>
        <h1
          className="text-4xl font-bold text-center mb-10"
          style={{ color: "#040F4D" }}
        >
          Reset Password
        </h1>
        <p className="text-center mb-0 text-lg">
          Masukkan email yang ditautkan ke akun Anda.
        </p>
        <p className="text-center mb-10 text-lg">
          Kami akan mengirimkan email konfirmasi untuk mengubah kata sandi Anda.
        </p>
        <input
          type="email"
          id="email"
          style={{ borderRadius: "60px" }}
          placeholder="Masukkan Email"
          className="input mx-auto w-96 p-5 h-16 border-2 border-black mt-5 mb-12"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button
          type="submit"
          style={{
            borderRadius: "20px",
            fontWeight: "700",
            backgroundColor: "#040F4D",
          }}
          className="button p-5 w-48 m-10 mx-auto text-white rounded-3 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Loading..." : "Reset Password"}
        </button>
        {message && <p className="text-center mt-5">{message}</p>}
      </form>
    </div>
  );
};

export default PreForgot;
