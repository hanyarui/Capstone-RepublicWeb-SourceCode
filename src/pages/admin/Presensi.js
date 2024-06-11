import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const Presensi = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 w-full">
        <Navbar />
        <div className="px-10 pt-5">
          <div
            className="mb-4 py-10 pl-10"
            style={{
              backgroundColor: "#040F4D",
            }}
          >
            <div>
              <div className="">
                <h2 className="text-3xl text-white font-bold">
                  Tambah Akun Karyawan
                </h2>
                <p className="text-white">Data per tanggal</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Presensi;
