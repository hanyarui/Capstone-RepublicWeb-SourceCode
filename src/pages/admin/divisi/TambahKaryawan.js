import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import Shift from "../Shift";

const TambahKaryawan = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    pendidikan_terakhir: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    phoneNumber: "",
    username: "",
    email: "",
    password: "",
    ulangiPassword: "",
    tanggal_masuk: "",
    tanggal_keluar: "",
    NIP: "",
    division: "",
    OS: "",
    lokasi_kantor: null,
    Browser: "",
    barcode: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.ulangiPassword) {
      alert("Password dan Ulangi Password tidak sama");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Log formDataToSend entries
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await fetch(
        "https://republikweb-cp-backend.vercel.app/karyawan/register",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      // Log response
      const textResponse = await response.text();
      console.log(textResponse);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
      // Handle success response here
    } catch (error) {
      console.error("There was an error!", error);
      // Handle error response here
    }
  };

  return (
    <div className="flex h-full bg-slate-100">
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
          <form className="grid grid-cols-4 gap-5" onSubmit={handleSubmit}>
            <div className="grid grid-rows-5 p-4 border rounded-lg bg-white">
              <div className="flex flex-col">
                <label className="font-bold mb-2">Nama</label>
                <input
                  type="text"
                  name="nama"
                  className="border border-gray-300 rounded px-4 py-2"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Pendidikan Terakhir</label>
                <input
                  type="text"
                  name="pendidikanTerakhir"
                  className="border border-gray-300 rounded px-4 py-2"
                  value={formData.pendidikan_terakhir}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Tempat Lahir</label>
                <input
                  type="text"
                  name="tempatLahir"
                  className="border border-gray-300 rounded px-4 py-2"
                  value={formData.tempat_lahir}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Tanggal Lahir</label>
                <input
                  type="date"
                  name="tanggalLahir"
                  className="border border-gray-300 rounded px-4 py-2"
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Nomor HP</label>
                <input
                  type="text"
                  name="nomorHP"
                  className="border border-gray-300 rounded px-4 py-2"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-rows-4 p-4 border rounded-lg bg-white">
              <div className="flex flex-col">
                <label className="font-bold mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  className="border border-gray-300 rounded px-4 py-2"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  className="border border-gray-300 rounded px-4 py-2"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  className="border border-gray-300 rounded px-4 py-2"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Ulangi Password</label>
                <input
                  type="password"
                  name="ulangiPassword"
                  className="border border-gray-300 rounded px-4 py-2"
                  value={formData.ulangiPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-rows-4 p-4 border rounded-lg bg-white">
              <div className="flex flex-col">
                <label className="font-bold mb-2">Tanggal Masuk</label>
                <input
                  type="date"
                  name="tanggalMasuk"
                  className="border border-gray-300 rounded px-4 py-2"
                  value={formData.tanggal_masuk}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Tanggal Keluar</label>
                <input
                  type="date"
                  name="tanggalKeluar"
                  className="border border-gray-300 rounded px-4 py-2"
                  value={formData.tanggal_keluar}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">NIP</label>
                <input
                  type="text"
                  name="NIP"
                  className="border border-gray-300 rounded px-4 py-2"
                  value={formData.NIP}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Divisi</label>
                <select
                  name="divisi"
                  className="border border-gray-300 rounded px-4 py-2"
                  value={formData.division}
                  onChange={handleChange}
                >
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
                <select
                  name="os"
                  className="border border-gray-300 rounded px-4 py-2"
                  value={formData.OS}
                  onChange={handleChange}
                >
                  <option>Macintosh</option>
                  <option>Windows</option>
                  <option>Linux</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Browser</label>
                <select
                  name="browser"
                  className="border border-gray-300 rounded px-4 py-2"
                  value={formData.Browser}
                  onChange={handleChange}
                >
                  <option>Chrome</option>
                  <option>Firefox</option>
                  <option>Safari</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Upload Barcode</label>
                <input
                  type="file"
                  name="barcode"
                  className="border border-gray-300 rounded px-4 py-2"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-blue-500 w-2/5 text-white px-8 py-2 mb-8 rounded"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TambahKaryawan;
