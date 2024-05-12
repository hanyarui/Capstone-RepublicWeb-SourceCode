import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiLockFill } from "react-icons/ri";

const LoginFormHp = () => {
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
      alert("Username atau password salah");
    }
  };

  return (
    <div
      className="flex-initial w-full h-3/4"
      style={{
        backgroundColor: "#ffffff",
        color: "white",
        borderRadius: "20px 20px 0 0",
      }}
    >
      <form
        className="form flex flex-col w-full p-10 mt-60 shadow"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto mb-5 text-black">
          <RiLockFill />
        </div>
        <h1 className="text-2xl font-bold text-center text-black mb-10">
          Login
        </h1>
        <label className="block mb-2 text-black" htmlFor="username">
          Username/Email
        </label>
        <input
          type="text"
          id="username"
          style={{ borderRadius: "5px" }}
          placeholder="Masukkan Username / Email"
          className="input p-2 h-12 border border-black mb-5 w-full"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label className="block mb-2 text-black" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          style={{ borderRadius: "5px" }}
          placeholder="Masukkan Password"
          className="input p-2 h-12 border border-black mb-8 w-full"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="w-full flex flex-row-reverse justify-between">
          <div className="text-right">
            <Link to="/ForgotPassword" className="text-right text-black">
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
            <label htmlFor="remember" className="ml-3 text-left text-black">
              Ingat Saya
            </label>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          style={{
            borderRadius: "5px",
            fontWeight: "700",
            backgroundColor: "#040F4D",
          }}
          className="button p-4 w-1/2 mx-auto text-black rounded-3 cursor-pointer"
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
  );
};

export default LoginFormHp;
