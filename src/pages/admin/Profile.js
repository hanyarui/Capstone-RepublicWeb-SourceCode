import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../../components/Sidebar";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Ambil token dari cookies
        const token = Cookies.get("token");

        if (!token) {
          console.error("Token tidak ditemukan di cookies");
          return;
        }

        // Decode token untuk mendapatkan karyawanId
        const decodedToken = jwtDecode(token);
        const karyawanId = decodedToken.karyawanId;

        // Ambil data profil dari API
        const response = await axios.get(
          `https://republikweb-cp-backend.vercel.app/karyawan/${karyawanId}`
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  if (!profileData) {
    return (
      <div className="w-full h-full items-center text-center">
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      {/* Main Content */}
      <div className="flex flex-col flex-grow justify-center items-center p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center justify-center w-full max-w-6xl h-full">
          <div className="p-6 w-full max-w-sm mx-auto h-max md:col-span-1">
            <div className="flex flex-col items-center space-y-4 h-full">
              <img
                src={profileData.profile_photo_url}
                alt="Profile"
                className="w-44 h-44 rounded-full"
              />
              <div className="text-center">
                <h2 className="text-xl font-bold">{profileData.fullname}</h2>
                <p className="text-gray-600">{profileData.email}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full h-max md:col-span-2">
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex flex-col items-start">
                <label className="text-sm font-bold mb-2 text-gray-700">
                  Profile Picture
                </label>
                <input
                  type="file"
                  name="profile_photo"
                  className="px-4 py-2 font-semibold text-sm text-gray-600 bg-white rounded hover:bg-gray-100 border-2 border-gray-300"
                />
                <button className="mt-2 text-blue-600 hover:underline focus:outline-none">
                  Remove
                </button>
              </div>
            </div>
            <label className="text-sm font-bold mb-2 text-gray-700">
              Personal Details
            </label>
            <form>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                    placeholder={profileData.fullname}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                    placeholder={profileData.email}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    No HP
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                    placeholder={profileData.phoneNumber}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Alamat
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                    placeholder={profileData.address}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-auto">
                <button className="px-4 py-2 font-bold text-white bg-gray-400 rounded hover:bg-gray-500 focus:outline-none focus:shadow-outline">
                  Cancel
                </button>
                <button className="ml-3 px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
