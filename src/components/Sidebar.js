import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-100 flex flex-col justify-between p-4 shadow-2xl">
      <div>
        <div className="items-center pt-8 pb-16">
          <img src="assets/logo.svg" className="mx-auto size-20" alt="Logo" />
        </div>
        <nav className="space-y-2">
          <Link
            to="/Dashboard"
            className="block px-4 py-2 text-gray-800 font-bold hover:bg-gray-200 rounded"
          >
            Dashboard
          </Link>
          <Link
            to="/Presensi"
            className="block px-4 py-2 text-gray-800 font-bold hover:bg-gray-200 rounded"
          >
            Presensi
          </Link>
          <Link
            to="/Divisi"
            className="block px-4 py-2 text-gray-800 font-bold hover:bg-gray-200 rounded"
          >
            Divisi
          </Link>
          <Link
            to="/Shift"
            className="block px-4 py-2 text-gray-800 font-bold hover:bg-gray-200 rounded"
          >
            Shift
          </Link>
          <Link
            to="/Laporan"
            className="block px-4 py-2 text-gray-800 font-bold hover:bg-gray-200 rounded"
          >
            Laporan
          </Link>
        </nav>
      </div>
      <a href="#" className="block text-gray-800 font-bold">
        Log out
      </a>
    </aside>
  );
};

export default Sidebar;
