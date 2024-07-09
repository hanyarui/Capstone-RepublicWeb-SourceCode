import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiLockFill } from "react-icons/ri";
import { jwtDecode } from "jwt-decode";

const LoginFormHp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      "https://republikweb-cp-backend.vercel.app/karyawan/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.token) {
      const decodedToken = jwtDecode(data.token);

      if (decodedToken.isAdmin) {
        document.cookie = `token=${data.token}; max-age=3600; path=/`;

        window.location.href = "/Dashboard";
      } else {
        document.cookie = `token=${data.token}; max-age=3600; path=/`;

        window.location.href = "/Homepage";
      }
    } else {
      setMessage("Email atau password salah");
    }
  };

  return (
    <div
      className="flex-initial w-full h-1/2"
      style={{
        backgroundColor: "#ffffff",
        color: "white",
      }}
    >
      <form
        className="form flex flex-col w-full p-10 mt-60"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto mb-2 text-black">
          <RiLockFill />
        </div>
        <h1 className="text-2xl font-bold text-center text-black mb-10">
          Login
        </h1>
        <label className="block mb-2 text-black" htmlFor="username">
          Email
        </label>
        <input
          type="text"
          id="username"
          style={{ borderRadius: "5px" }}
          placeholder="Masukkan Email"
          className="input p-2 h-12 border text-black border-black mb-5 w-full"
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
          className="input p-2 h-12 border text-black border-black mb-8 w-full"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="w-full flex flex-row-reverse justify-between">
          <div className="text-right">
            <Link to="/ForgotPassword" className="text-right text-black">
              Lupa Kata Sandi?
            </Link>
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
          className="button p-4 w-1/2 mt-5 mx-auto text-white rounded-3 cursor-pointer"
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
