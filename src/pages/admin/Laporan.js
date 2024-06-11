import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { IoIosSearch } from "react-icons/io";

const Shift = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Ganti URL dengan endpoint API Anda
    axios
      .get("https://api.example.com/activity-logs")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 w-full ">
        <Navbar />
        <div className="px-10 pt-5">
          <div
            className="mb-4 py-10 px-10"
            style={{
              backgroundColor: "#040F4D",
            }}
          >
            <div className="grid grid-cols-2">
              <div className="text-white">
                <h2 className="text-3xl  font-bold">Data Presensi</h2>
                <p className="">Data per tanggal</p>
              </div>

              <div className="relative text-white">
                <form>
                  <label className="block">Cari Karyawan</label>
                  <div className="relative mt-1">
                    <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      className="w-full border text-black border-gray-300 rounded pl-10 pr-4 py-2"
                      placeholder="Pencarian"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-end">
            <form className="w-1/6 flex justify-end">
              <div className="relative">
                <input
                  type="date"
                  className="w-full border text-black border-black px-2 py-2"
                  placeholder="Pencarian"
                />
              </div>
              <div className="relative ml-3">
                <input
                  type="date"
                  className="w-full border text-black border-black px-2 py-2"
                  placeholder="Pencarian"
                />
              </div>
              <button className="ml-3 items-center px-4 py-2 border border-black bg-white">
                <IoIosSearch />
              </button>
            </form>
          </div>
          <div className="overflow-x-auto mt-10">
            <table className="table-auto w-full border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2 font-semibold">No</th>
                  <th className="border px-4 py-2 font-semibold">Nama</th>
                  <th className="border px-4 py-2 font-semibold">NIP</th>
                  <th className="border px-4 py-2 font-semibold">
                    Total Kehadiran
                  </th>
                  <th className="border px-4 py-2 font-semibold">Total Izin</th>
                  <th className="border px-4 py-2 font-semibold">
                    Total Ketidakhadiran
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border text-base">
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.nip}</td>
                    <td>{item.hadir}</td>
                    <td>{item.izin}</td>
                    <td>{item.tidak}</td>
                    <td>
                      <button className="text-blue-500">Action</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shift;
