import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { IoIosSearch } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";
import Sidebar from "../../components/Sidebar";

const DetailDivisi = () => {
  const { divisionName } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [karyawan, setKaryawan] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKaryawan = async () => {
      try {
        const response = await fetch(
          `https://republikweb-cp-backend.vercel.app/karyawan/division/${divisionName}`
        );
        const data = await response.json();

        // Ensure data is an array
        if (Array.isArray(data)) {
          setKaryawan(data);
        } else {
          console.error("Expected data to be an array:", data);
          setKaryawan([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching karyawan data:", error);
        setLoading(false);
      }
    };

    fetchKaryawan();
  }, [divisionName]);

  const filteredKaryawan = karyawan.filter(
    (employee) =>
      employee.name &&
      employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
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
            <h1 className="text-lg text-white font-medium mb-0">
              Filter Data Karyawan
            </h1>
          </div>
          <div className="bg-white shadow rounded p-4 mb-4">
            <div className="flex space-x-2 items-center">
              <input type="checkbox" className="form-checkbox" />
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>Bulk Action</option>
                <option>Action 1</option>
                <option>Action 2</option>
              </select>
              <button className="bg-blue-900 text-white px-4 py-1 rounded">
                Apply
              </button>
              <span className="text-lg font-semibold mr-2">Project :</span>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>Pilih Project</option>
                <option>Project 1</option>
                <option>Project 2</option>
              </select>
            </div>
          </div>
          <div className="bg-blue-950 p-4 rounded">
            {filteredKaryawan.map((karyawan, index) => (
              <div key={index} className="bg-white shadow rounded p-4 mb-4">
                <div className="bg-blue-900 text-white p-4 rounded mb-2">
                  <p className="font-mono">{karyawan.id}</p>
                </div>
                <div className="bg-blue-900 text-white p-4 rounded">
                  <p className="text-lg font-semibold">{karyawan.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailDivisi;
