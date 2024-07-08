import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../../components/Sidebar";
import ClipLoader from "react-spinners/ClipLoader";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          console.error("Token tidak ditemukan di cookies");
          return;
        }

        const decodedToken = jwtDecode(token);
        const karyawanId = decodedToken.karyawanId;

        const response = await axios.get(
          `https://republikweb-cp-backend.vercel.app/karyawan/${karyawanId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfileData(response.data);
        setFormData({
          fullname: response.data.fullname || "",
          email: response.data.email || "",
          phoneNumber: response.data.phoneNumber || "",
          address: response.data.address || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      if (!token) {
        console.error("Token tidak ditemukan di cookies");
        return;
      }

      const decodedToken = jwtDecode(token);
      const karyawanId = decodedToken.karyawanId;

      await axios.put(
        `https://republikweb-cp-backend.vercel.app/karyawan/${karyawanId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-100 h-screen flex items-center justify-center">
        <div className="flex items-center justify-center">
          <ClipLoader
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-grow justify-center items-center p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center justify-center w-full max-w-6xl h-full">
          <div className="bg-white py-24 px-6 w-full rounded-lg shadow-lg max-w-sm mx-auto h-max md:col-span-1">
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
          <div className="bg-white py-8 px-6 rounded-lg shadow-lg w-full h-max md:col-span-2">
            <div className="flex items-center space-x-6 mb-4">
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
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
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
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Alamat
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-auto">
                <button
                  type="button"
                  className="px-4 py-2 font-bold text-white bg-gray-400 rounded hover:bg-gray-500 focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                >
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
