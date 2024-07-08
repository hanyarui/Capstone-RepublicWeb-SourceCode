import { React, useState, useEffect } from "react";
import TodayDate from "../../../pages/user/home/TodayDate";
import Logout from "../../../pages/auth/Logout";
import { IoPersonSharp } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const Header = () => {
  const [time, setTime] = useState(getCurrentTime());
  const [employeeName, setEmployeeName] = useState("");
  const [employeeNIP, setEmployeeNIP] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    // Ambil token dari cookies
    const token = Cookies.get("token"); // Pastikan ini adalah nama yang Anda gunakan untuk menyimpan token di cookies
    if (token) {
      try {
        // Dekode token
        const decodedToken = jwtDecode(token);

        // Set state untuk Nama dan NIP karyawan
        setEmployeeName(decodedToken.fullname);
        setEmployeeNIP(decodedToken.NIP);
      } catch (error) {
        console.error("Token tidak valid atau tidak bisa didekode:", error);
      }
    }

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="text-white w-full flex justify-between items-center pt-12 pb-8 px-16"
      style={{
        backgroundImage: "url(/assets/background.svg)",
        borderRadius: "0 0 40px 0",
      }}
    >
      <div className="grid w-full gap-12">
        <div className="grid grid-cols-2">
          <div className="text-left flex items-center">
            <FaRegCalendarAlt className="w-7 h-7" />
            <div className="text-xl font-thin ml-3">
              <TodayDate />
            </div>
          </div>
          <div className="text-2xl font-semibold text-right">{time}</div>
        </div>

        <div className="text-center text-3xl font-semibold italic">
          "Change your life now for better future"
        </div>

        <div className="grid grid-cols-2 place-items-centerer">
          <div className="flex items-center">
            <div className="bg-red-700 w-12 h-12 rounded-full flex justify-center items-center">
              <IoPersonSharp className="w-9 h-9" />
            </div>
            <div className="ml-3">
              <p className="text-xl font-semibold">{employeeName}</p>
              <p>{employeeNIP}</p>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
