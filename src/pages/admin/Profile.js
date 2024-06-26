import React from "react";
import Sidebar from "../../components/Sidebar";

const Profile = () => {
  return (
    <div className="flex h-full bg-gray-100">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-6 mb-6">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-32 h-32 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold">Wahyudi Atkinson</h2>
              <p className="text-gray-600">wahyudiatkinson@gmail.com</p>
            </div>
          </div>
          <form>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                  value="Wahyudi Atkinson"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                  value="wahyudiatkinson@gmail.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  No HP
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                  value="081326273187"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Alamat
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                  value="Jateng"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Additional Info
              </label>
              <textarea
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                rows="4"
                placeholder="Enter additional information"
              ></textarea>
            </div>
            <div className="flex justify-end">
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
  );
};

export default Profile;
