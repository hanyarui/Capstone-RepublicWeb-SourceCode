import React, { useState, useEffect } from "react";
import TambahAkun from "./divisi/TambahKaryawan"; // Import the modal component
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const Divisi = ({ activities }) => {
  const [visibleActivities, setVisibleActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDivisions, setFilteredDivisions] = useState([]);

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
    <div className="flex h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 w-full p-8">
        <Navbar />
        <div className="flex justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Cari divisi/team"
            className="border border-gray-300 rounded px-4 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
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
      </main>
    </div>
  );
};

export default Divisi;
