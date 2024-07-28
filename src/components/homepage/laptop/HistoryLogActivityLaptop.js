import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./HeaderLaptop";
import { IoIosArrowBack } from "react-icons/io";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Library untuk mendekode token JWT

const HistoryLogActivityLaptop = () => {
  const [data, setData] = useState([]);
  const [isLogPopupVisible, setIsLogPopupVisible] = useState(false);

  const hanleEditActivityLog = () => {
    setIsLogPopupVisible(true);
  };

  useEffect(() => {
    // Get karyawanId from token
    const token = Cookies.get("token");

    let karyawanId = "";
    if (token) {
      const decodedToken = jwtDecode(token);
      karyawanId = decodedToken.karyawanId;
    }

    // Ganti URL dengan endpoint API yang sesuai dan gunakan IdKaryawan
    axios
      .get(`https://localhost:3000/activitylog/${karyawanId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Sertakan token dalam header Authorization
        },
      })
      .then((response) => {
        // Transformasi data menjadi format yang sesuai
        const transformedData = response.data.map((item) => {
          // Konversi timestamp ke format tanggal yang dapat dibaca
          const date = new Date(
            item.date._seconds * 1000 + item.date._nanoseconds / 1000000
          );
          const formattedDate = date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            // hour: "2-digit",
            // minute: "2-digit",
            // second: "2-digit",
          });

          return {
            ...item,
            tanggal: formattedDate,
            activity: item.description,
          };
        });

        setData(transformedData);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className="h-full w-screen bg-white flex flex-col items-center p-0 overflow-auto">
      <Header />
      <div className="flex items-center w-11/12 p-0 my-5">
        <Link to="/Homepage">
          <IoIosArrowBack className="w-10 h-10" />
        </Link>
        <div className="flex-grow text-center font-bold text-xl">
          History Log Activity
        </div>
      </div>

      <div className="w-11/12 mb-10 overflow-auto">
        <table className="table-auto w-full">
          <thead className="sticky top-0 bg-gray-200">
            <tr className="border text-left">
              <th className="text-center py-2 sticky top-0 bg-gray-200 z-10">
                No
              </th>
              <th className="text-center py-2 sticky top-0 bg-gray-200 z-10">
                Tanggal
              </th>
              <th className="text-center py-2 sticky top-0 bg-gray-200 z-10">
                Activity Log
              </th>
              <th className="text-center py-2 sticky top-0 bg-gray-200 z-10">
                Status
              </th>
              <th className="text-center py-2 sticky top-0 bg-gray-200 z-10">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border text-base">
                <td className="text-center py-2">{index + 1}</td>
                <td className="text-center py-2">{item.tanggal}</td>
                <td className="py-2">{item.activity}</td>
                <td className="text-center py-2">{item.status}</td>
                <td className="items-center justify-center text-center">
                  <button
                    onClick={hanleEditActivityLog}
                    className="text-white rounded-lg py-1 px-4 bg-blue-950"
                  >
                    Action
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isLogPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 h-max bg-white p-5 rounded-2xl">
            <div className="flex justify-between mb-3">
              <div className=" text-center font-bold text-lg">Log Activity</div>
              <button
                onClick={() => setIsLogPopupVisible(false)}
                className="size-7"
              >
                X
              </button>
            </div>
            <input
              type="text"
              // value={logActivityText}
              // onChange={(e) => setLogActivityText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-3 text-left align-text-top"
              placeholder="Masukkan aktivitas log anda..."
            />
            <button
              // onClick={handleConfirmActivity}
              className="mt-3 p-2 bg-blue-500 text-white rounded"
            >
              Konfirmasi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryLogActivityLaptop;
