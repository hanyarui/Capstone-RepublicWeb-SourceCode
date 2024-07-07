import React from "react";
import Sidebar from "../../components/Sidebar";

const Profile = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      {/* Main Content */}
      <div className="flex flex-col flex-grow justify-center items-center p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 justify-center w-full max-w-6xl h-full">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto h-full md:col-span-1">
            <div className="flex flex-col items-center space-y-4 h-full">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-44 h-44 rounded-full"
              />
              <div className="text-center">
                <h2 className="text-xl font-bold">Wahyudi Atkinson</h2>
                <p className="text-gray-600">wahyudiatkinson@gmail.com</p>
              </div>
              <div className="mt-6">
                <h3 className="text-xl text-center font-bold mb-2">About</h3>
                <p className="text-gray-700 text-center">
                  Mengatur pelaksanaan sistem kerja perusahaan, mulai dari
                  meng-input, memproses, mengelola hingga mengevaluasi data
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full md:col-span-2">
            <div className="flex items-center space-x-6 mb-6">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
              <div className="flex flex-col items-start">
                <button className="px-4 py-2 font-semibold text-sm text-gray-600 bg-white rounded hover:bg-gray-100 border-2 border-gray-300">
                  Change Photo
                </button>
                <button className="px-10 mt-2 text-blue-600 hover:underline focus:outline-none">
                  remove
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
                    value="Wahyudi Atkinson"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                    value="wahyudiatkinson@gmail.com"
                    readOnly
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
                    value="081326273187"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Alamat
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                    value="Jateng"
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-6">
                <h3 className="block mb-2 text-sm font-bold text-gray-700">
                  Additional Info
                </h3>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  About
                </label>
                <textarea
                  className="h-56 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                  rows="4"
                  placeholder="Enter additional information"
                ></textarea>
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
