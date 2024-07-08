import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./HeaderHp";
import { IoIosArrowBack } from "react-icons/io";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Library untuk mendekode token JWT

const HistoryLogActivityHp = () => {
  const [data, setData] = useState([]);

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
      .get(
        `https://republikweb-cp-backend.vercel.app/activitylog/${karyawanId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Sertakan token dalam header Authorization
          },
        }
      )
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
    <div className="min-h-screen bg-white flex flex-col items-center p-0">
      <Header />
      <div className="flex items-center w-11/12 p-0 my-5">
        <Link to="/Homepage">
          <IoIosArrowBack className="w-10 h-10" />
        </Link>
        <div className="flex-grow text-center font-bold text-xl">
          History Log Activity
        </div>
      </div>

      <table className="table-auto w-11/12">
        <thead>
          <tr className="border bg-gray-200 text-left">
            <th>No</th>
            <th>Tanggal</th>
            <th>Activity Log</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border text-base">
              <td>{index + 1}</td>
              <td>{item.tanggal}</td>
              <td>{item.activity}</td>
              <td>{item.status}</td>
              <td>
                <button className="text-blue-500">Action</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryLogActivityHp;
