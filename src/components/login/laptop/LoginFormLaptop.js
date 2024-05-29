import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiLockFill } from "react-icons/ri";

const LoginFormLaptop = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Ganti push dengan navigasi sesuai dengan kebutuhan aplikasi Anda
      window.location.href = "/Homepage";
    } else {
      alert("Email atau password salah");
    }
  };

  return (
    <div
      className="flex w-5/12 items-center h-screen"
      style={{
        backgroundColor: "#040F4D",
        color: "white",
        borderRadius: "120px 0 0 0",
      }}
    >
      <div className="w-full">
        <form
          className="form flex flex-col w-full h-full px-20"
          onSubmit={handleSubmit}
        >
          <div className="mx-auto mb-2">
            <RiLockFill />
          </div>
          <h1 className="text-2xl font-bold text-center mb-10">Login</h1>
          <label className="block mb-2" htmlFor="username">
            Email
          </label>
          <input
            type="text"
            id="username"
            style={{ borderRadius: "5px", backgroundColor: "#040F4D" }}
            placeholder="Masukkan Email"
            className="input p-2 h-12 border border-gray-300 mb-5 w-full"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label className="block mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            style={{ borderRadius: "5px", backgroundColor: "#040F4D" }}
            placeholder="Masukkan Password"
            className="input p-2 h-12 border border-gray-300 mb-8 w-full"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="w-full flex flex-row-reverse justify-between">
            <div className="text-right">
              <Link to="/ForgotPassword" className="text-right">
                Lupa Kata Sandi?
              </Link>
            </div>
            <div className="mb-8 text-left">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                value="remember"
              />
              <label htmlFor="remember" className="ml-3 text-left">
                Ingat Saya
              </label>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            style={{ borderRadius: "5px", fontWeight: "700" }}
            className="button p-4 w-1/2 mx-auto bg-white text-black rounded-3 cursor-pointer"
          >
            Login
          </button>
          {/* <div className="text-center p-8">
          <Link to="/Register" className="text-right">
            Belum Punya Akun?
          </Link>
        </div> */}
        </form>
      </div>
    </div>
  );
};

export default LoginFormLaptop;
