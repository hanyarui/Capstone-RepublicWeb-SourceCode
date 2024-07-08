import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { IoIosSearch } from "react-icons/io";
import Cookies from "js-cookie";
import ClipLoader from "react-spinners/ClipLoader";

const Shift = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token"); // Mengambil token dari cookies
      try {
        const response = await axios.get(
          "https://republikweb-cp-backend.vercel.app/kehadiran/karyawan/all",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Menyertakan token dalam header
            },
          }
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-100 h-screen flex items-center justify-center">
        <div className="flex items-center justify-center">
          <ClipLoader
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    );
  }

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
                <h2 className="text-3xl  font-bold">Data Laporan</h2>
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
            <table className="table-auto w-full border-collapse bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 border-b">No</th>
                  <th className="py-2 border-b">Nama</th>
                  <th className="py-2 border-b">NIP</th>
                  <th className="py-2 border-b">Total Kehadiran</th>
                  <th className="px-4 py-2 font-semibold border-b">
                    Total Izin
                  </th>
                  <th className="px-4 py-2 font-semibold border-b">
                    Total Ketidakhadiran
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="text-base">
                    <td className="text-center py-2 border-b">{index + 1}</td>
                    <td className="text-center py-2 border-b">
                      {item.fullname}
                    </td>
                    <td className="text-center py-2 border-b">{item.NIP}</td>
                    <td className="text-center py-2 border-b">
                      {item.totalHadir}
                    </td>
                    <td className="text-center py-2 border-b">
                      {item.totalIzin}
                    </td>
                    <td className="text-center py-2 border-b">
                      {item.totalTidakHadir}
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
