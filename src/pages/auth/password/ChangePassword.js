import React from "react";

const PreForgot = () => {
  return (
    <div className="m-auto w-full h-screen p-5">
      <form className="form flex flex-col w-full mt-40">
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
          id="password"
          style={{ borderRadius: "60px" }}
          placeholder="Ketikkan Password Baru"
          className="input mx-auto w-96 p-5 h-16 border-2 border-black mt-5 mb-8"
          // value={password}
          // onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="password"
          id="password"
          style={{ borderRadius: "60px" }}
          placeholder="Konfirmasi Password"
          className="input mx-auto w-96 p-5 h-16 border-2 border-black mt-0 mb-12"
          // value={password}
          // onChange={(event) => setPassword(event.target.value)}
        />
        <button
          //   onClick={handleSubmit}
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

export default PreForgot;
