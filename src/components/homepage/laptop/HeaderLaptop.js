import React, { useState, useEffect } from "react";
import TodayDate from "../../../pages/user/home/TodayDate";
import Logout from "../../../pages/auth/Logout";
import { IoPersonSharp } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import jwtDecode from "jwt-decode";

const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const Header = () => {
  const [time, setTime] = useState(getCurrentTime());
  const [nama, setNama] = useState("");
  const [nip, setNIP] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Function to fetch Nama and NIP from API
    const fetchUserData = async () => {
      // Get token from cookies
      const token = getCookie("token");

      if (token) {
        try {
          // Decode token to get user information
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.karyawanId;

          // Fetch user data from API
          const response = await fetch(
            `https://republikweb-cp-backend.vercel.app/v1/karyawan/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            setNama(userData.fullname);
            setNIP(userData.NIP);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  // Function to get cookie value by name
  const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

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
              <p className="text-xl font-semibold">{nama}</p>
              <p>{nip}</p>
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
