import React, { useState, useEffect } from "react";
import { GiBackwardTime } from "react-icons/gi";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import axios from "axios";

const OTP = () => {
  const [otp, setOtp] = useState("");
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let timer;
    if (isResendEnabled) {
      timer = setTimeout(() => {
        if (countdown > 0) {
          setCountdown((prevCount) => prevCount - 1);
        } else {
          setIsResendEnabled(false);
          setCountdown(60);
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isResendEnabled, countdown]);

  const handleResend = async () => {
    alert("Mengirim ulang OTP...");
    try {
      const response = await axios.post(
        "https://republikweb-cp-backend.vercel.app/v1/karyawan/request-password-reset"
      );
      setMessage("OTP has been sent to your email.");
      window.location.href = "/OTP";
    } catch (error) {
      setMessage("Failed to send OTP. Please try again.");
    }

    // Disable the button for 60 seconds
    setIsResendEnabled(false);
    setCountdown(60); // Reset countdown
  };

  const handleVerifyOTP = (event) => {
    event.preventDefault();
    alert(`Memverifikasi OTP: ${otp}`);
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
          //   onClick={handleSubmit}
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
        <div className="text-center">
          <div className="flex-col">
            <p className="mr-2">Belum menerima email?</p>
            <Link onClick={handleResend} className="text-red-600">
              Kirim ulang
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OTP;
