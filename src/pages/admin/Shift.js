import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { IoIosSearch } from "react-icons/io"; // Import the search icon

const Shift = () => {
  const data = [
    { id: 1, name: "Syalita Widyandini", shift: "Shift" },
    { id: 2, name: "Michael Mcqueen", shift: "Shift" },
    { id: 3, name: "Raihan Ahmad Hafidz", shift: "Shift" },
    { id: 4, name: "Febrian Adipurnowo", shift: "Shift" },
    { id: 5, name: "Ilham", shift: "Shift" },
  ];

  return (
    <div className="flex h-full bg-slate-100">
      <Sidebar />
      <main className="flex-1 w-full">
        <Navbar />
        <div className="px-10 pt-5">
          <div
            className="mb-4 pt-16 pb-20 pl-10"
            style={{ backgroundImage: "url(/assets/background_add.png)" }}
          >
            <h2 className="text-3xl text-white font-bold">
              Sunting Shift "Syalita Widyandini"
            </h2>
            <p className="text-white">180509100 202112 1001</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Cari Nama"
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 border-b">No</th>
                  <th className="py-2 border-b">Nama</th>
                  <th className="py-2 border-b">Shift</th>
                  <th className="py-2 border-b">Jam Masuk</th>
                  <th className="py-2 border-b">Jam Pulang</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 border-b text-center">{item.id}</td>
                    <td className="py-2 border-b text-center">{item.name}</td>
                    <td className="py-2 border-b text-center">
                      <select className="border border-gray-300 rounded px-2 py-1">
                        <option>{item.shift}</option>
                      </select>
                    </td>
                    <td className="py-2 border-b text-center">
                      <input
                        type="time"
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                    </td>
                    <td className="py-2 border-b text-center">
                      <input
                        type="time"
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <button className="bg-blue-500 text-white px-8 py-2 rounded">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shift;
