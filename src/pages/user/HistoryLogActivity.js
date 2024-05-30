import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../components/homepage/Header";
import { IoIosArrowBack } from "react-icons/io";

const HistoryLogActivity = () => {
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

      <table class="table-auto w-11/12">
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

export default HistoryLogActivity;
