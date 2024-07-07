import React from "react";
import { HiOutlineBell } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex justify-end items-center p-4">
      <HiOutlineBell className="mr-4 text-3xl justify-center" />
      <Link to="/profile" className="flex items-center">
        <div className="mr-4 text-right">
          <p className="font-semibold">Wahyudi Atkinson</p>
          <p className="text-sm text-gray-600">Admin</p>
        </div>
        <img
          className="w-12 h-12 rounded-full"
          src="https://via.placeholder.com/40"
          alt="User Avatar"
        />
      </Link>
    </header>
  );
};

export default Navbar;
