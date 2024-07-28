import React, { useState, useEffect } from "react";
import { GiBackwardTime } from "react-icons/gi";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const OTP = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerifyOTP = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:3000/karyawan/validasi-otp",
        { otp }
      );
      if (response.data.message === "OTP is valid") {
        const userId = response.data.userId;

        alert("OTP is valid");
        navigate("/ChangePassword", { state: { userId } });
      } else {
        setMessage(response.data.error || "Invalid OTP");
      }
    } catch (error) {
      setMessage("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <div className="m-auto w-full h-screen p-5">
      <form
        className="form flex flex-col w-full mt-40"
        onSubmit={handleVerifyOTP}
      >
        <div className="mx-auto mb-10">
          <GiBackwardTime style={{ width: "100px", height: "100px" }} />
        </div>
        <p className="text-center mb-12">
          Masukkan 6 digit kode OTP yang telah kami kirimkan ke email Anda.
        </p>
        <div className="mx-auto">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="mx-4"> </span>}
            renderInput={(props) => (
              <input
                type="number"
                {...props}
                style={{ padding: "10px", width: "60px", height: "60px" }}
                className="rounded-md border border-black text-black text-3xl text-center"
              />
            )}
          />
        </div>

        <button
          type="submit"
          style={{
            borderRadius: "20px",
            fontWeight: "700",
            backgroundColor: "#040F4D",
          }}
          className="button p-4 w-80 m-14 mx-auto text-white rounded-3 cursor-pointer"
        >
          Verify Now
        </button>
        {message && <p className="text-center text-red-600">{message}</p>}
      </form>
    </div>
  );
};

export default OTP;
