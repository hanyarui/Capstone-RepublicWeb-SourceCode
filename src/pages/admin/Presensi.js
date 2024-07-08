import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { IoIosSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import Cookies from "js-cookie";

const formatTime = (datetime) => {
  const date = new Date(datetime);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const Presensi = () => {
  const [data, setData] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      console.error("No token found!");
      return;
    }

    const fetchLogs = async () => {
      try {
        const response = await axios.get(
          "https://republikweb-cp-backend.vercel.app/all-logs",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const mappedData = response.data.map((item) => ({
          nama: item.fullname,
          masuk: formatTime(item.checkInTimes.start),
          pulang: formatTime(item.checkInTimes.end),
          mulai: formatTime(item.checkInTimes.break),
          selesai: formatTime(item.checkInTimes.resume),
          total: item.total,
          kurang: item.kurang,
          aktivitas: item.aktivitas,
          aksi: item.aksi,
          status: item.status,
        }));
        setData(mappedData);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    const fetchAttendanceStats = async () => {
      try {
        const response = await fetch(
          "https://republikweb-cp-backend.vercel.app/daily-attendance",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching attendance stats");
        }

        const data = await response.json();
        setAttendanceStats(data);

        console.log(data);
      } catch (error) {
        console.error("Failed to fetch attendance stats:", error);
      }
    };

    fetchLogs();
    fetchAttendanceStats();
  }, []);

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 w-full">
        <Navbar />
        <div className="px-10 pt-5">
          <div
            className="mb-4 py-10 px-10"
            style={{ backgroundColor: "#040F4D" }}
          >
            <div className="grid grid-cols-2">
              <div className="text-white">
                <h2 className="text-3xl font-bold">Data Presensi</h2>
                <p>Data per tanggal</p>
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
          <div className="grid grid-cols-2">
            <div className="bg-gray-200 p-4 shadow-xl">
              <p className="mb-3">Total Kehadiran</p>
              <div className="grid grid-flow-col border-t-2 border-gray-400 pt-3">
                <div className="flex items-center">
                  <p>Total Masuk</p>
                  <p className="py-1.5 px-4 bg-green-500 ml-2 rounded-xl font-bold text-white">
                    {attendanceStats ? attendanceStats.hadirCount : "..."}
                  </p>
                </div>
                <div className="flex items-center">
                  <p>Total Izin</p>
                  <p className="py-1.5 px-4 bg-yellow-500 ml-2 rounded-xl font-bold text-white">
                    {attendanceStats ? attendanceStats.izinCount : "..."}
                  </p>
                </div>
                <div className="flex items-center">
                  <p>Total Tidak Masuk</p>
                  <p className="py-1.5 px-4 bg-red-500 ml-2 rounded-xl font-bold text-white">
                    {attendanceStats ? attendanceStats.tidakHadirCount : "..."}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-rows-2">
              <p className="text-red-600 underline text-end">Scan Barcode</p>
              <div className="flex justify-end items-end">
                <form className="w-3/4">
                  <div className="relative">
                    <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                    <input
                      type="date"
                      className="w-full border text-black border-black pl-10 pr-2 py-2"
                      placeholder="Pencarian"
                    />
                  </div>
                </form>
                <div>
                  <button
                    className="ml-3 items-center justify-center px-4 border border-black flex bg-white"
                    style={{ height: "44px" }}
                  >
                    <CiFilter className="mr-3" />
                    Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto mt-10">
            <table className="table-auto w-full border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2 font-semibold">No</th>
                  <th className="border px-4 py-2 font-semibold">Nama</th>
                  <th className="border px-4 py-2 font-semibold" colSpan="2">
                    Jam Kerja
                    <div className="flex border-t border-black justify-between mt-1 font-semibold">
                      <span>Masuk</span>
                      <span>Pulang</span>
                    </div>
                  </th>
                  <th className="border px-4 py-2 font-semibold" colSpan="2">
                    Jam Istirahat
                    <div className="flex border-t border-black justify-between mt-1 font-semibold">
                      <span>Mulai</span>
                      <span>Selesai</span>
                    </div>
                  </th>
                  <th className="border px-4 py-2 font-semibold" colSpan="3">
                    Total Jam Kerja
                    <div className="flex border-t border-black justify-between mt-1 font-semibold">
                      <span>Total Jam</span>
                      <span>(+) (-)</span>
                    </div>
                  </th>
                  <th className="border px-4 py-2 font-semibold" colSpan="2">
                    Log Aktivitas
                    <div className="flex border-t border-black justify-between mt-1 font-semibold">
                      <span>Log Aktivitas</span>
                      <span>Aksi</span>
                    </div>
                  </th>
                  <th className="border px-4 py-2 font-semibold">
                    Status Kehadiran
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border text-base">
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.masuk}</td>
                    <td>{item.pulang}</td>
                    <td>{item.mulai}</td>
                    <td>{item.selesai}</td>
                    <td>{item.total}</td>
                    <td>{item.kurang}</td>
                    <td>{item.aktivitas}</td>
                    <td>{item.aksi}</td>
                    <td>{item.status}</td>
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

export default Presensi;
