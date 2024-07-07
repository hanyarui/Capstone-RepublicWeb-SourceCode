import React from "react";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex justify-end items-center p-4">
      <FaBell className="text-xl mr-4" />
      <Link to="/profile" className="flex items-center">
        <div className="mr-4 text-right">
          <p className="font-bold">Wahyudi Atkinson</p>
          <p className="text-sm text-gray-600">Admin</p>
        </div>
        <img
          className="w-10 h-10 rounded-full"
          src="https://via.placeholder.com/40"
          alt="User Avatar"
        />
      </Link>
    </header>
  );
};

export default Navbar;
