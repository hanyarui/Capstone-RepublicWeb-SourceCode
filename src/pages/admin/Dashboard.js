import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";

const Dashboard = ({ activities }) => {
  const [visibleActivities, setVisibleActivities] = useState([]);

  useEffect(() => {
    const updateVisibleActivities = () => {
      const itemHeight = 70; // Adjust based on actual item height
      const headerHeight = 50; // Adjust based on actual header height
      const footerHeight = 40; // Adjust based on actual footer height
      const availableHeight = window.innerHeight - headerHeight - footerHeight;
      const maxItems = Math.floor(availableHeight / itemHeight);
      setVisibleActivities(activities?.slice(0, maxItems) || []);
    };

    updateVisibleActivities();
    window.addEventListener("resize", updateVisibleActivities);

    return () => window.removeEventListener("resize", updateVisibleActivities);
  }, [activities]);

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 flex flex-col justify-between p-4">
        <div>
          <div className="items-center pt-8 pb-16">
            <img src="assets/logo.svg" className="mx-auto size-20" alt="Logo" />
          </div>
          <nav className="space-y-2">
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 font-bold hover:bg-gray-200 rounded"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 font-bold hover:bg-gray-200 rounded"
            >
              Presensi
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 font-bold hover:bg-gray-200 rounded"
              >
              Divisi
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 font-bold hover:bg-gray-200 rounded"
            >
              Shift
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 font-bold hover:bg-gray-200 rounded"
            >
              Laporan
            </a>
          </nav>
        </div>
        <a href="#" className="block text-gray-800 font-bold">
          Log out
        </a>
      </aside>
      <main className="flex-1 w-full">
        <header className="flex justify-end items-center p-4">
          <FaBell className="text-xl mr-4" />
          <div className="mr-4 text-right">
            <p className="font-bold">Wahyudi Atkinson</p>
            <p className="text-sm text-gray-600">Admin</p>
          </div>
          <img
            className="w-10 h-10 rounded-full"
            src="https://via.placeholder.com/40"
            alt="User Avatar"
          />
        </header>
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-1">
            <section className="grid grid-cols-2 auto-cols-min size-4/5 gap-6 p-6">
              <div className="bg-blue-500 text-white p-4 rounded">
                <h3 className="text-lg">Jumlah Karyawan</h3>
                <p className="text-2xl">325</p>
              </div>
              <div className="bg-green-500 text-white p-4 rounded">
                <h3 className="text-lg">Masuk</h3>
                <p className="text-2xl">200</p>
              </div>
              <div className="bg-red-500 text-white p-4 rounded">
                <h3 className="text-lg">Tidak Masuk</h3>
                <p className="text-2xl">100</p>
              </div>
              <div className="bg-orange-500 text-white p-4 rounded">
                <h3 className="text-lg">Izin</h3>
                <p className="text-2xl">25</p>
              </div>
            </section>
            <div></div>
          </div>
          <section className="bg-gray-100 p-4 rounded mb-5 max-h-screen overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Aktivitas Terbaru</h2>
            <ul className="space-y-4">
              {visibleActivities.map((activity, index) => (
                <li key={index} className="flex items-center">
                  <BsPersonFill className="text-xl mr-4" />
                  <div>
                    <p className="font-bold">{activity.name}</p>
                    <span className="text-sm text-gray-600">
                      {activity.time}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            {activities && activities.length > visibleActivities.length && (
              <a href="#" className="block mt-4 text-blue-500">
                Lihat lebih lanjut...
              </a>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
