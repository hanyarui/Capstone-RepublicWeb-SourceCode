import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-100 flex flex-col justify-between p-4">
      <div>
        <div className="items-center pt-8 pb-16">
          <img src="assets/logo.svg" className="mx-auto size-20" alt="Logo" />
        </div>
        <nav className="space-y-2">
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 font-bold hover:bg-gray-200 rounded"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 font-bold hover:bg-gray-200 rounded"
          >
            Presensi
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 font-bold hover:bg-gray-200 rounded"
          >
            Divisi
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 font-bold hover:bg-gray-200 rounded"
          >
            Shift
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 font-bold hover:bg-gray-200 rounded"
          >
            Laporan
          </a>
        </nav>
      </div>
      <a href="#" className="block text-gray-800 font-bold">
        Log out
      </a>
    </aside>
  );
};

export default Sidebar;
