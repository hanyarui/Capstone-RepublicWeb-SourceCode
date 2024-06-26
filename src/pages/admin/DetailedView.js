import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { IoIosSearch } from "react-icons/io"; // Import the search icon
import { IoChevronBackOutline } from "react-icons/io5";

const DetailedView = ({ members = [] }) => {
  const { divisionName } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 w-full">
        <Navbar />
        <div className="px-10 pt-5">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center space-x-2">
              <button className="text-xl" onClick={() => navigate("/Divisi")}>
                <IoChevronBackOutline size={32} />
              </button>
              <h1 className="text-3xl font-bold">{divisionName}</h1>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Cari Anggota Divisi"
                className="border border-gray-300 rounded px-10 py-2 w-96"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IoIosSearch className="absolute left-2 top-2 text-gray-400 w-6 h-6" />
            </div>
          </div>
          <div className="bg-blue-950 shadow rounded p-4 mb-0">
            <h className="text-lg text-white font-medium mb-0">
              Filter Data Anggota
            </h>
          </div>
          <div className="bg-white shadow rounded p-4 mb-4">
            <div className="flex space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>Bulk Action</option>
                <option>Action 1</option>
                <option>Action 2</option>
              </select>
              <button className="bg-blue-900 text-white px-4 py-1 rounded">
                Apply
              </button>
              <span className="text-lg font-semibold">Project :</span>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>Pilih Project</option>
                <option>Project 1</option>
                <option>Project 2</option>
              </select>
            </div>
          </div>
          <div className="bg-blue-950 p-4 rounded">
            {filteredMembers.map((member, index) => (
              <div key={index} className="bg-white shadow rounded p-4 mb-4">
                <div className="bg-blue-900 text-white p-4 rounded mb-2">
                  <p className="font-mono">{member.id}</p>
                </div>
                <div className="bg-blue-900 text-white p-4 rounded">
                  <p className="text-lg font-semibold">{member.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailedView;
