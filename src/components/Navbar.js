import { React, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { HiOutlineBell } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    // Ambil token dari cookies
    const token = Cookies.get("token"); // Pastikan ini adalah nama yang Anda gunakan untuk menyimpan token di cookies
    if (token) {
      try {
        // Dekode token
        const decodedToken = jwtDecode(token);

        // Set state untuk Nama karyawan
        setEmployeeName(decodedToken.fullname);
      } catch (error) {
        console.error("Token tidak valid atau tidak bisa didekode:", error);
      }
    }
  }, []); // Kosong berarti hanya akan dijalankan sekali setelah render pertama

  return (
    <header className=" flex justify-end items-center p-4">
      <HiOutlineBell className="text-3xl mr-4" />
      <Link to="/Profile" className="flex items-center">
        <div className="flex flex-col text-right mr-4">
          <p className="font-bold">{employeeName ? employeeName : "Nama"}</p>
          <p className="text-sm text-gray-600">Administrator</p>
        </div>
        <img
          className="w-14 h-14 rounded-full"
          src="https://via.placeholder.com/40"
          alt="User Avatar"
        />
      </Link>
    </header>
  );
};

export default Navbar;
