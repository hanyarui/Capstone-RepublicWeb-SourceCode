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
  const [searchTerm, setSearchTerm] = useState("");
  // const [hiddenChecks, setHiddenChecks] = useState({});
  // const [hiddenCancels, setHiddenCancels] = useState({});
  const [isAttendancePopupVisible, setIsAttendancePopupVisible] =
    useState(false);

  const [attendanceForm, setAttendanceForm] = useState({
    karyawanId: "",
    date: getTodayDate(),
    status: "izin",
  });

  const hanleAttendance = (idKaryawan, date) => {
    setAttendanceForm({ karyawanId: idKaryawan, date: date, status: "izin" });
    setIsAttendancePopupVisible(true);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setAttendanceForm((prev) => ({ ...prev, [name]: value }));
  };

  const today = getTodayDate();

  const handleAttendance = async (idKaryawan, date) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.post(
        `https://republikweb-cp-backend.vercel.app/add-permission/${idKaryawan}/${date}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Attendance permission added successfully!");
    } catch (error) {
      console.error("There was an error adding the permission!", error);
    }
  };

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
        alert("Activity log rejected successfully");
        // setHiddenCancels((prev) => ({ ...prev, [activitylogid]: true }));
      }
    } catch (error) {
      alert("Error rejecting activity log:", error);
    }
  };

  const handleAccept = async (idKaryawan, activitylogid) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      const response = await axios.post(
        `https://republikweb-cp-backend.vercel.app/activitylog/${idKaryawan}/${activitylogid}/accept`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        alert("Activity log accepted successfully");
        // setHiddenChecks((prev) => ({ ...prev, [activitylogid]: true }));
      }
    } catch (error) {
      alert("Error rejecting activity log:", error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      console.error("No token found!");
      return;
    }

    const today = getTodayDate();

    const fetchAttendanceToday = async (fullname = "") => {
      try {
        const response = await axios.get(
          `https://republikweb-cp-backend.vercel.app/report/date/${today}?fullname=${fullname}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.data.map((item) => {
          const masuk =
            item.checkInTimes.start == null
              ? "-"
              : formatTime(item.checkInTimes.start);
          const pulang =
            item.checkInTimes.end == null
              ? "-"
              : formatTime(item.checkInTimes.end);
          const mulai =
            item.checkInTimes.break == null
              ? "-"
              : formatTime(item.checkInTimes.break);
          const selesai =
            item.checkInTimes.resume == null
              ? "-"
              : formatTime(item.checkInTimes.resume);

          return {
            idKaryawan: item.karyawanId,
            nama: item.fullname,
            masuk: masuk,
            pulang: pulang,
            mulai: mulai,
            selesai: selesai,
          };
        });
      } catch (error) {
        alert("There was an error fetching the data!", error);
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
          idKaryawan: item.karyawanId,
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
        return response.data.map((item) => ({
          idKaryawan: item.idkaryawan,
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
          idKaryawan: item.karyawanId,
          totalWorkHours: item.totalWorkHours,
        }));
      } catch (error) {
        console.error("There was an error fetching the data!", error);
        return [];
      }
    };

    const fetchAttandanceUser = async () => {
      try {
        const response = await axios.get(
          `https://republikweb-cp-backend.vercel.app/attendancedate/date/${today}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.data.map((item) => ({
          idKaryawan: item.karyawanId,
          status: item.status,
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
      const [
        attendanceToday,
        debtAttendance,
        activityLog,
        attendanceUser,
        totalWorkHours,
      ] = await Promise.all([
        fetchAttendanceToday(searchTerm),
        fetchDebtAttendance(),
        fetchActivityLog(),
        fetchAttandanceUser(),
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
          combinedData[item.idKaryawan].activitylogid = item.activitylogid;
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

      // Gabungkan data dari attendanceUser
      attendanceUser.forEach((item) => {
        if (combinedData[item.idKaryawan]) {
          combinedData[item.idKaryawan].status = item.status;
        } else {
          combinedData[item.idKaryawan] = { ...item };
        }
      });

      // Convert combinedData object to array
      const finalData = Object.values(combinedData);
      setData(finalData);
    };

    fetchData();
    fetchAttendanceStats();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
                <label className="block">Cari Karyawan</label>
                <div className="relative mt-1">
                  <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border text-black border-gray-300 rounded pl-10 pr-4 py-2"
                    placeholder="Pencarian"
                  />
                </div>
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
                  <th className="px-4 py-2 border font-semibold">No</th>
                  <th className="px-4 py-2 border font-semibold">Nama</th>
                  <th className="px-4 py-2 border font-semibold" colSpan="2">
                    Jam Kerja
                    <div className="flex border-t border-black justify-between mt-1 font-semibold">
                      <span>Masuk</span>
                      <span>Pulang</span>
                    </div>
                  </th>
                  <th className="px-4 py-2 border font-semibold" colSpan="2">
                    Jam Istirahat
                    <div className="flex border-t border-black justify-between mt-1 font-semibold">
                      <span>Mulai</span>
                      <span>Selesai</span>
                    </div>
                  </th>
                  <th className="px-4 py-2 border font-semibold" colSpan="2">
                    Total Jam Kerja
                    <div className="flex border-t border-black justify-between mt-1 font-semibold">
                      <span>Total Jam</span>
                      <span>(+) (-)</span>
                    </div>
                  </th>
                  <th className="px-4 py-2 border font-semibold" colSpan="2">
                    Log Aktivitas
                    <div className="flex border-t border-black justify-between mt-1 font-semibold">
                      <span>Log Aktivitas</span>
                      <span>Aksi</span>
                    </div>
                  </th>
                  <th className="px-4 py-2 border font-semibold">
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
                      <td className="text-center border-b py-2">{index + 1}</td>
                      <td className="text-center border-b py-2">{item.nama}</td>
                      <td className="text-center border-b py-2">
                        {item.masuk}
                      </td>
                      <td className="text-center border-b py-2">
                        {item.pulang}
                      </td>
                      <td className="text-center border-b py-2">
                        {item.mulai}
                      </td>
                      <td className="text-center border-b py-2">
                        {item.selesai}
                      </td>
                      <td className="text-center border-b py-2">
                        {item.totalWorkHours}
                      </td>
                      <td
                        className={`text-center border-b py-2 ${debtTimeClass}`}
                      >
                        {item.kurang || "00:00:00"}
                      </td>
                      <td className="text-center border-b py-2">
                        {item.aktivitas}
                      </td>
                      <td className="text-end border-b py-2">
                        <div className="flex col-span-2 items-center justify-between px-2">
                          {/* {!hiddenChecks[item.activitylogid] && ( */}
                          <MdOutlineCancel
                            className="size-5 cursor-pointer fill-red-500"
                            onClick={() =>
                              handleReject(item.idKaryawan, item.activitylogid)
                            }
                          />
                          {/* )} */}
                          {/* {!hiddenCancels[item.activitylogid] && ( */}
                          <FaRegCircleCheck
                            className="cursor-pointer fill-green-500"
                            onClick={() =>
                              handleAccept(item.idKaryawan, item.activitylogid)
                            }
                          />
                          {/* )} */}
                        </div>
                      </td>
                      <td className="text-center border-b py-2">
                        <div
                          onClick={hanleAttendance}
                          className="cursor-pointer"
                        >
                          {item.status}
                        </div>
                      </td>
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
        {isAttendancePopupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/3 h-max bg-white p-5 rounded-2xl">
              <div className="flex justify-between mb-3">
                <div className=" text-center font-bold text-lg">
                  Log Activity
                </div>
                <button
                  onClick={() => setIsAttendancePopupVisible(false)}
                  className="size-7"
                >
                  X
                </button>
              </div>
              <label className="font-bold">Keterangan</label>
              <input
                type="text"
                className="border border-gray-300 rounded px-4 py-2 mt-1 mb-3 w-full"
              />
              <label className="font-bold">Link Gambar</label>
              <input
                type="url"
                className="border border-gray-300 rounded px-4 py-2 mt-1 mb-3 w-full"
              />
              <label className="font-bold mb-1">Ganti Jam</label>
              <div className="flex justify-between w-3/4">
                <div>
                  <input type="radio" id="ganti" placeholder="Ganti Jam" />
                  <label for="ganti" className="ml-2">
                    Ganti Jam
                  </label>
                </div>
                <div>
                  <input type="radio" id="ganti" placeholder="Ganti Jam" />
                  <label for="ganti" className="ml-2">
                    Tidak Ganti Jam
                  </label>
                </div>
              </div>
              <label className="font-bold mt-3 mb-1 block">Status</label>
              <select
                name="status"
                id="status"
                className="border border-gray-300 rounded px-4 py-2 w-full"
                value={attendanceForm.status}
                onChange={handleFormChange}
              >
                <option>Tidak Hadir</option>
                <option>Izin</option>
              </select>
              <button
                // onClick={() => handleAttendance(item.idKaryawan, today)}
                className="mt-8 p-2 bg-blue-500 text-white rounded"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Presensi;
