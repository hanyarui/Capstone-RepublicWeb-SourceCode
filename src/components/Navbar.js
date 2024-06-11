import React from "react";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="flex justify-end items-center p-4">
      <FaBell className="text-xl mr-4" />
      <div className="mr-4 text-right">
        <p className="font-bold">Wahyudi Atkinson</p>
        <p className="text-sm text-gray-600">Admin</p>
      </div>
      <img
        className="w-10 h-10 rounded-full"
        src="https://via.placeholder.com/40"
        alt="User Avatar"
      />
    </header>
  );
};

export default Navbar;
