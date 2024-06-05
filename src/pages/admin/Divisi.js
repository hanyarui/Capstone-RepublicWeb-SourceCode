import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import TambahAkun from "./TambahAkun"; // Import the modal component

const Divisi = ({ activities }) => {
  const [visibleActivities, setVisibleActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDivisions, setFilteredDivisions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const divisions = [
    { name: "UI/UX Designer", members: 20 },
    { name: "Programmer", members: 20 },
    { name: "Desain Grafis", members: 20 },
    { name: "Fotografer", members: 20 },
    { name: "Videografer", members: 20 },
    { name: "Digital Marketing", members: 20 },
    { name: "Marketing Communication", members: 20 },
    { name: "Content Writer", members: 20 },
    { name: "Human Resource", members: 20 },
    { name: "Social Media Specialist", members: 20 },
    { name: "Tiktok Creator", members: 20 },
  ];

  useEffect(() => {
    const updateVisibleActivities = () => {
      const itemHeight = 70; // Adjust based on actual item height
      const headerHeight = 50; // Adjust based on actual header height
      const footerHeight = 40; // Adjust based on actual footer height
      const availableHeight = window.innerHeight - headerHeight - footerHeight;
      const maxItems = Math.floor(availableHeight / itemHeight);
      setVisibleActivities(activities?.slice(0, maxItems) || []);
    };

    updateVisibleActivities();
    window.addEventListener("resize", updateVisibleActivities);

    return () => window.removeEventListener("resize", updateVisibleActivities);
  }, [activities]);

  useEffect(() => {
    const lowercasedFilter = searchQuery.toLowerCase();
    const filteredData = divisions.filter((item) =>
      item.name.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredDivisions(filteredData);
  }, [searchQuery]);

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 flex flex-col justify-between p-4">
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
              Laporan
            </a>
          </nav>
        </div>
        <a href="#" className="block text-gray-800 font-bold">
          Log out
        </a>
      </aside>
      <main className="flex-1 w-full p-8">
        <header className="flex justify-end items-center mb-8">
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
        <div className="flex justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Cari divisi/team"
            className="border border-gray-300 rounded px-4 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setIsModalOpen(true)} // Open modal on button click
          >
            Tambah Anggota
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            {filteredDivisions
              .slice(0, Math.ceil(filteredDivisions.length / 2))
              .map((division, index) => (
                <div
                  key={index}
                  className="bg-white shadow rounded p-4 flex items-center justify-between"
                >
                  <p className="font-bold">{division.name}</p>
                  <span>{division.members} Anggota</span>
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-4">
            {filteredDivisions
              .slice(Math.ceil(filteredDivisions.length / 2))
              .map((division, index) => (
                <div
                  key={index}
                  className="bg-white shadow rounded p-4 flex items-center justify-between"
                >
                  <p className="font-bold">{division.name}</p>
                  <span>{division.members} Anggota</span>
                </div>
              ))}
          </div>
        </div>
        <a href="#" className="block mt-4 text-blue-500 text-center">
          See all teams...
        </a>
        {isModalOpen && <TambahAkun onClose={() => setIsModalOpen(false)} />}{" "}
        {/* Render modal */}
      </main>
    </div>
  );
};

export default Divisi;
