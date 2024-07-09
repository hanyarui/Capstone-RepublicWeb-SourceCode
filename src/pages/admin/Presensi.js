import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { IoIosSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import Cookies from "js-cookie";
import ClipLoader from "react-spinners/ClipLoader";

// Fungsi untuk format waktu ke jam:menit
const formatTime = (datetime) => {
  const date = new Date(datetime);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Fungsi untuk format waktu dari menit ke format HH:MM:SS
const formatTimeDebt = (minutes) => {
  const isNegative = minutes < 0;
  const absMinutes = Math.abs(minutes);

  const hours = Math.floor(absMinutes / 60);
  const mins = Math.floor(absMinutes % 60);
  const secs = Math.floor((absMinutes * 60) % 60);

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    mins
  ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return isNegative ? `+${formattedTime}` : `-${formattedTime}`;
};

// Fungsi untuk mendapatkan tanggal hari ini dalam format YYYY-MM-DD
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // tambahkan 1 karena getMonth() dimulai dari 0
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Presensi = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState(null);

  const handleReject = async (idKaryawan, activitylogid) => {
    try {
      console.log("idKaryawan:", idKaryawan);
      console.log("activitylogid:", activitylogid);
      const token = Cookies.get("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      const response = await axios.post(
        `https://republikweb-cp-backend.vercel.app/activitylog/${idKaryawan}/${activitylogid}/reject`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        console.log("Activity log rejected successfully");
      }
    } catch (error) {
      console.error("Error rejecting activity log:", error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      console.error("No token found!");
      return;
    }

    const today = getTodayDate();

    const fetchAttendanceToday = async () => {
      try {
        const response = await axios.get(
          `https://republikweb-cp-backend.vercel.app/report/date/${today}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.data.map((item) => ({
          idKaryawan: item.idKaryawan,
          nama: item.fullname,
          masuk: formatTime(item.checkInTimes.start),
          pulang: formatTime(item.checkInTimes.end),
          mulai: formatTime(item.checkInTimes.break),
          selesai: formatTime(item.checkInTimes.resume),
          status: item.status,
        }));
      } catch (error) {
        console.error("There was an error fetching the data!", error);
        return [];
      }
    };

    const fetchDebtAttendance = async () => {
      try {
        const response = await axios.get(
          `https://republikweb-cp-backend.vercel.app/debttime/report/${today}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.data.map((item) => ({
          idKaryawan: item.idKaryawan,
          kurang: formatTimeDebt(item.timeDebt),
        }));
      } catch (error) {
        console.error("There was an error fetching the data!", error);
        return [];
      }
    };

    const fetchActivityLog = async () => {
      try {
        const response = await axios.get(
          `https://republikweb-cp-backend.vercel.app/activitylog/date/${today}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Activity Log Response Data:", response.data);

        return response.data.map((item) => ({
          idKaryawan: item.idKaryawan,
          activitylogid: item.activitylogid,
          aktivitas: item.description,
        }));
      } catch (error) {
        console.error("There was an error fetching the data!", error);
        return [];
      }
    };

    const fetchTotalWorkHours = async () => {
      try {
        const response = await axios.get(
          `https://republikweb-cp-backend.vercel.app/total-work-hours/${today}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.data.map((item) => ({
          idKaryawan: item.idKaryawan,
          totalWorkHours: item.totalWorkHours,
        }));
      } catch (error) {
        console.error("There was an error fetching the data!", error);
        return [];
      }
    };

    const fetchAttendanceStats = async () => {
      try {
        const response = await axios.get(
          "https://republikweb-cp-backend.vercel.app/daily-attendance",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status !== 200) {
          throw new Error("Error fetching attendance stats");
        }

        const data = response.data;
        setAttendanceStats(data);

        console.log(data);
      } catch (error) {
        console.error("Failed to fetch attendance stats:", error);
      }

      setLoading(false);
    };

    const fetchData = async () => {
      const [attendanceToday, debtAttendance, activityLog, totalWorkHours] =
        await Promise.all([
          fetchAttendanceToday(),
          fetchDebtAttendance(),
          fetchActivityLog(),
          fetchTotalWorkHours(),
        ]);

      // Menggabungkan data berdasarkan idKaryawan
      const combinedData = {};

      // Gabungkan data dari attendanceToday
      attendanceToday.forEach((item) => {
        combinedData[item.idKaryawan] = { ...item };
      });

      // Gabungkan data dari debtAttendance
      debtAttendance.forEach((item) => {
        if (combinedData[item.idKaryawan]) {
          combinedData[item.idKaryawan].kurang = item.kurang;
        } else {
          combinedData[item.idKaryawan] = { ...item };
        }
      });

      // Gabungkan data dari activityLog
      activityLog.forEach((item) => {
        if (combinedData[item.idKaryawan]) {
          combinedData[item.idKaryawan].aktivitas = item.aktivitas;
          combinedData[item.idKaryawan].activitylogid = item.activitylogid; // Tambahkan activitylogid
        } else {
          combinedData[item.idKaryawan] = { ...item };
        }
      });

      // Gabungkan data dari totalWorkHours
      totalWorkHours.forEach((item) => {
        if (combinedData[item.idKaryawan]) {
          combinedData[item.idKaryawan].totalWorkHours = item.totalWorkHours;
        } else {
          combinedData[item.idKaryawan] = { ...item };
        }
      });

      // Konversi objek ke array
      setData(Object.values(combinedData));
      setLoading(false);
    };

    fetchData();
    fetchAttendanceStats();
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
              <div></div>
              <div className="flex justify-end items-end">
                <form className="w-full ml-10">
                  <div className="relative">
                    <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                    <input
                      type="date"
                      className="w-full border text-black border-black pl-10 pr-2 py-2"
                      placeholder="Pencarian"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="overflow-auto mt-10">
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
                  <th className="border px-4 py-2 font-semibold" colSpan="2">
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
                {data.map((item, index) => {
                  const timeDebtValue = parseFloat(
                    item.kurang ? item.kurang.replace(":", ".") : "0"
                  );
                  const isPositive = timeDebtValue > 0;
                  const debtTimeClass = isPositive
                    ? "text-green-500"
                    : "text-red-500";

                  return (
                    <tr key={index} className="border text-base">
                      <td className="text-center border py-2">{index + 1}</td>
                      <td className="text-center border py-2">{item.nama}</td>
                      <td className="text-center border py-2">{item.masuk}</td>
                      <td className="text-center border py-2">{item.pulang}</td>
                      <td className="text-center border py-2">{item.mulai}</td>
                      <td className="text-center border py-2">
                        {item.selesai}
                      </td>
                      <td className="text-center border py-2">
                        {item.totalWorkHours}
                      </td>
                      <td
                        className={`text-center border py-2 ${debtTimeClass}`}
                      >
                        {item.kurang || "00:00:00"}
                      </td>
                      <td className="text-center border py-2">
                        {item.aktivitas}
                      </td>
                      <td className="text-end border py-2">
                        <div className="flex col-span-2 items-center justify-between px-2">
                          <MdOutlineCancel
                            className="size-5 cursor-pointer"
                            onClick={() =>
                              handleReject(item.idKaryawan, item.activitylogid)
                            }
                          />
                          <FaRegCircleCheck
                          // onClick={() => handleAccept(item.idKaryawan, item.activitylogid)}
                          />
                        </div>
                      </td>
                      <td className="text-center border py-2">{item.status}</td>
                      {/* <td className="text-center border py-2">
                        <button className="text-blue-500">Action</button>
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Presensi;
