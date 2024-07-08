import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { IoIosSearch } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";

const Shift = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const token = Cookies.get("token");

  const fetchData = async (fullname = "") => {
    try {
      const response = await axios.get(
        `https://republikweb-cp-backend.vercel.app/shift-details?fullname=${fullname}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const formattedData = response.data.map((item) => ({
        ...item,
        karyawanId: item.karyawanId, // Pastikan field ini sudah ada di data dari backend
      }));
      console.log("Fetched Data:", formattedData);
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching shift data:", error);
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Server Error";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(searchTerm);
  };

  const handleSave = async () => {
    try {
      const shifts = data.map((item) => ({
        karyawanId: item.karyawanId,
        shift: item.shift,
        jam_masuk: item.jam_masuk,
        jam_pulang: item.jam_pulang,
      }));

      console.log("Payload:", { shifts });

      const validShifts = ["pagi", "siang"];
      const invalidShift = shifts.find(
        (item) => !validShifts.includes(item.shift)
      );

      if (invalidShift) {
        alert(
          `Terjadi kesalahan: Shift tidak valid untuk karyawanId ${invalidShift.karyawanId}`
        );
        return;
      }

      const missingId = shifts.find((item) => !item.karyawanId);
      if (missingId) {
        alert(
          `Terjadi kesalahan: karyawanId tidak ditemukan untuk salah satu karyawan`
        );
        return;
      }

      await axios.put(
        "https://republikweb-cp-backend.vercel.app/shift-details/update/update-multiple",
        { shifts },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      fetchData();
      alert("Data berhasil disimpan!");
    } catch (error) {
      console.error("Error updating shift data:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`Terjadi kesalahan: ${error.response.data.message}`);
      } else {
        alert("Terjadi kesalahan saat menyimpan data.");
      }
    }
  };

  const changeTime = async () => {
    try {
      const shifts = data.map((item) => ({
        karyawanId: item.karyawanId,
        shift: item.shift,
      }));

      console.log("Payload:", { shifts });

      const validShifts = ["pagi", "siang"];
      const invalidShift = shifts.find(
        (item) => !validShifts.includes(item.shift)
      );

      if (invalidShift) {
        alert(
          `Terjadi kesalahan: Shift tidak valid untuk karyawanId ${invalidShift.karyawanId}`
        );
        return;
      }

      const missingId = shifts.find((item) => !item.karyawanId);
      if (missingId) {
        alert(
          `Terjadi kesalahan: karyawanId tidak ditemukan untuk salah satu karyawan`
        );
        return;
      }

      await axios.put(
        "https://republikweb-cp-backend.vercel.app/shift-details/update/update-multiple",
        { shifts },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      fetchData();
    } catch (error) {
      console.error("Error updating shift data:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`Terjadi kesalahan: ${error.response.data.message}`);
      } else {
        alert("Terjadi kesalahan saat menyimpan data.");
      }
    }
  };

  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
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
      <main className="flex-1 w-full flex flex-col">
        <Navbar />
        <div className="px-10 pt-5 flex-1 overflow-hidden flex flex-col">
          <div
            className="mb-4 pt-16 pb-20 pl-10"
            style={{ backgroundImage: "url(/assets/background_add.png)" }}
          >
            <h2 className="text-3xl text-white font-bold">Sunting Shift</h2>
          </div>
          <div className="mb-4 relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Cari Nama"
                className="border border-gray-300 rounded px-4 py-2 w-6/12 pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute left-3 top-3 text-gray-400 w-6 h-6"
              >
                <IoIosSearch />
              </button>
            </form>
          </div>
          <div className="bg-white rounded-lg shadow flex-1 overflow-y-scroll">
            <div>
              {error && <div className="text-red-500">Error: {error}</div>}
              <table className="table-auto w-full bg-white border">
                <thead className="sticky top-0 bg-gray-50">
                  <tr>
                    <th className="py-2 border-b">No</th>
                    <th className="py-2 border-b">Nama</th>
                    <th className="py-2 border-b">Shift</th>
                    <th className="py-2 border-b">Jam Masuk</th>
                    <th className="py-2 border-b">Jam Pulang</th>
                  </tr>
                </thead>
                <tbody className="overflow-y-auto">
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 border-b text-center">{index + 1}</td>
                      <td className="py-2 border-b text-center">
                        {item.fullname}
                      </td>
                      <td className="py-2 border-b text-center">
                        <select
                          className="border border-gray-300 rounded px-2 py-1"
                          value={item.shift}
                          onChange={(e) => {
                            handleInputChange(index, "shift", e.target.value);
                            changeTime();
                          }}
                        >
                          <option value="pagi">Pagi</option>
                          <option value="siang">Siang</option>
                        </select>
                      </td>
                      <td className="py-2 border-b text-center">
                        <input
                          type="time"
                          className="border border-gray-300 rounded px-2 py-1"
                          value={item.jam_masuk}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "jam_masuk",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="py-2 border-b text-center">
                        <input
                          type="time"
                          className="border border-gray-300 rounded px-2 py-1"
                          value={item.jam_pulang}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "jam_pulang",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center items-center my-5">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Simpan
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shift;
