import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { CiSearch } from "react-icons/ci";

const Presensi = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 w-full">
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
                <h2 className="text-3xl  font-bold">Tambah Akun Karyawan</h2>
                <p className="">Data per tanggal</p>
              </div>
              <div className="text-white">
                <form>
                  <label className="block">Cari Mahasiswa</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded mt-2 px-4 py-2"
                    placeholder="Pencarian"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Presensi;
