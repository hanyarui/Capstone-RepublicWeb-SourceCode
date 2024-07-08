import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";

const TambahKaryawan = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    pendidikan_terakhir: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    phoneNumber: "",
    username: "",
    email: null,
    password: null,
    ulangiPassword: null,
    tanggal_masuk: "",
    tanggal_keluar: "",
    NIP: null,
    division: "",
    OS: "",
    Browser: "",
    barcode: null,
    jam_masuk: "", // tambahkan field jam_masuk
    jam_pulang: "", // tambahkan field jam_pulang
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

    try {
      const response = await fetch(
        "https://republikweb-cp-backend.vercel.app/karyawan/register",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      alert("Data Karyawan Berhasil Ditambahkan");
      window.location.reload();
      // Handle success response here
      console.log("Success:", result);

      // Handle success response here, e.g., show success message or redirect
      alert("Karyawan berhasil ditambahkan!");

      // Clear form after successful submission (optional)
      setFormData({
        fullname: "",
        pendidikan_terakhir: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        phoneNumber: "",
        username: "",
        email: null,
        password: null,
        ulangiPassword: null,
        tanggal_masuk: "",
        tanggal_keluar: "",
        NIP: null,
        division: "",
        OS: "",
        Browser: "",
        barcode: null,
        jam_masuk: "",
        jam_pulang: "",
      });
    } catch (error) {
      console.error("There was an error!", error);
      // Handle error response here, e.g., show error message
      alert("Terjadi kesalahan saat menambahkan karyawan. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 w-screen">
        <Navbar />
        <div className="px-10 pt-3">
          <div
            className="mb-4 pt-10 pb-20 pl-10 flex justify-between"
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
                  name="fullname"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Pendidikan Terakhir</label>
                <input
                  type="text"
                  name="pendidikan_terakhir"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={formData.pendidikan_terakhir}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Tempat Lahir</label>
                <input
                  type="text"
                  name="tempat_lahir"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={formData.tempat_lahir}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Tanggal Lahir</label>
                <input
                  type="date"
                  name="tanggal_lahir"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Nomor HP</label>
                <input
                  type="text"
                  name="phoneNumber"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
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
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Ulangi Password</label>
                <input
                  type="password"
                  name="ulangiPassword"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
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
                  name="tanggal_masuk"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={formData.tanggal_masuk}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Tanggal Keluar</label>
                <input
                  type="date"
                  name="tanggal_keluar"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={formData.tanggal_keluar}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">NIP</label>
                <input
                  type="text"
                  name="NIP"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={formData.NIP}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Jam Masuk</label>
                <input
                  type="time"
                  name="jam_masuk"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={formData.jam_masuk}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Jam Pulang</label>
                <input
                  type="time"
                  name="jam_pulang"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={formData.jam_pulang}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold mb-2">Divisi</label>
                <select
                  name="division"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
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
                  name="OS"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
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
                  name="Browser"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
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
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="bg-blue-500 w-2/5 text-white px-8 py-1 mb-8 rounded"
                onClick={handleSubmit}
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
