import React from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";

const TambahKaryawan = () => {
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 w-full">
        <Navbar />
        <div className="px-10 pt-5">
          <div
            className="mb-4 pt-16 pb-20 pl-10 flex justify-between"
            style={{
              backgroundImage: "url(/assets/background_add.png)",
            }}
          >
            <h2 className="text-3xl text-white font-bold">
              Tambah Akun Karyawan
            </h2>
          </div>
          <form className="grid grid-cols-4 gap-5">
            <div className="grid grid-rows-5 p-4 border rounded-lg bg-white">
              <div className="flex flex-col">
                <label className="font-bold mb-2">Nama</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Pendidikan Terakhir</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Tempat Lahir</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Tanggal Lahir</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Nomor HP</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-4 py-2"
                />
              </div>
            </div>
            <div className="grid grid-rows-4 p-4 border rounded-lg bg-white">
              <div className="flex flex-col">
                <label className="font-bold mb-2">Username</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Email</label>
                <input
                  type="email"
                  className="border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Password</label>
                <input
                  type="password"
                  className="border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Ulangi Password</label>
                <input
                  type="password"
                  className="border border-gray-300 rounded px-4 py-2"
                />
              </div>
            </div>
            <div className="grid grid-rows-4 p-4 border rounded-lg bg-white">
              <div className="flex flex-col">
                <label className="font-bold mb-2">Tanggal Masuk</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Tanggal Keluar</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">NIP</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Divisi</label>
                <select className="border border-gray-300 rounded px-4 py-2">
                  <option>UI/UX Designer</option>
                  <option>Programmer</option>
                  <option>Desain Grafis</option>
                  <option>Fotografer</option>
                  <option>Videografer</option>
                  <option>Digital Marketing</option>
                  <option>Marketing Communication</option>
                  <option>Content Writer</option>
                  <option>Human Resource</option>
                  <option>Social Media Specialist</option>
                  <option>Tiktok Creator</option>
                </select>
              </div>
            </div>
            <div className="grid grid-rows-4 p-4 border rounded-lg bg-white">
              <div className="flex flex-col">
                <label className="font-bold mb-2">OS</label>
                <select className="border border-gray-300 rounded px-4 py-2">
                  <option>Macintosh</option>
                  <option>Windows</option>
                  <option>Linux</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Browser</label>
                <select className="border border-gray-300 rounded px-4 py-2">
                  <option>Chrome</option>
                  <option>Firefox</option>
                  <option>Safari</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Upload Barcode</label>
                <input
                  type="file"
                  className="border border-gray-300 rounded px-4 py-2"
                />
              </div>
            </div>
          </form>
          <div className="flex justify-center mt-8">
            <button className="bg-blue-500 w-2/5 text-white px-8 py-2 mb-8 rounded">
              Simpan
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TambahKaryawan;
