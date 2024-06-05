import React, { useState } from "react";

const TambahAkun = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg w-3/4">
        <div className="mb-4 flex justify-between">
          <h2 className="text-lg font-bold">Tambah Akun Karyawan</h2>
          <button onClick={onClose} className="text-red-500">
            X
          </button>
        </div>
        <form className="grid grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label className="font-bold mb-2">Nama</label>
            <input
              type="text"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold mb-2">Username</label>
            <input
              type="text"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold mb-2">Tanggal Masuk</label>
            <input
              type="date"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold mb-2">OS</label>
            <select className="border border-gray-300 rounded px-4 py-2">
              <option>Macintosh</option>
              <option>Windows</option>
              <option>Linux</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-bold mb-2">Pendidikan Terakhir</label>
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
            <label className="font-bold mb-2">Tanggal Keluar</label>
            <input
              type="date"
              className="border border-gray-300 rounded px-4 py-2"
            />
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
            <label className="font-bold mb-2">Tempat Lahir</label>
            <input
              type="text"
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
            <label className="font-bold mb-2">NIP</label>
            <input
              type="text"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold mb-2">Lokasi Kantor</label>
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
            <label className="font-bold mb-2">Ulangi Password</label>
            <input
              type="password"
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
          <div className="flex flex-col">
            <label className="font-bold mb-2">Nomor HP</label>
            <input
              type="text"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div className="flex flex-col col-span-4">
            <label className="font-bold mb-2">Upload Barcode</label>
            <input
              type="file"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>
        </form>
        <div className="flex justify-center mt-8">
          <button className="bg-blue-500 text-white px-8 py-2 rounded">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahAkun;
