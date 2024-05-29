import React, { useState } from "react";
import { GiBackwardTime } from "react-icons/gi";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";

const PreForgot = () => {
  const [otp, setOtp] = useState("");

  return (
    <div className="m-auto w-full h-screen p-5">
      <form className="form flex flex-col w-full mt-40">
        <div className="mx-auto mb-10">
          <GiBackwardTime style={{ width: "100px", height: "100px" }} />
        </div>
        <p className="text-center mb-12">
          Masukkan 4 digit kode OTP yang telah kami kirimkan ke email Anda.
        </p>
        <div className="mx-auto">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
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
            <Link className="text-red-600">Kirim ulang</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PreForgot;
