import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Tambahkan ini untuk mengakses cookies
import { BsPersonFill } from "react-icons/bs";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { FiCheckCircle } from "react-icons/fi";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { MdOutlineDoNotDisturbOn } from "react-icons/md";

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [visibleActivities, setVisibleActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Ambil token dari cookies
        const token = Cookies.get("token");

        if (!token) {
          throw new Error("No authorization token found");
        }

        const response = await fetch(
          "https://republikweb-cp-backend.vercel.app/recent-activities",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Sertakan token dalam header Authorization
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const data = await response.json();

        const formattedActivities = data.map((activity) => ({
          name: activity.activity.split(" ")[0],
          time: activity.activity,
          type: activity.type,
        }));

        setActivities(formattedActivities);
        setVisibleActivities(formattedActivities.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    const updateVisibleActivities = () => {
      const itemHeight = 70;
      const headerHeight = 50;
      const footerHeight = 40;
      const availableHeight = window.innerHeight - headerHeight - footerHeight;
      const maxItems = Math.floor(availableHeight / itemHeight);
      setVisibleActivities(activities?.slice(0, maxItems) || []);
    };

    updateVisibleActivities();
    window.addEventListener("resize", updateVisibleActivities);

    return () => window.removeEventListener("resize", updateVisibleActivities);
  }, [activities]);

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 w-full">
        <Navbar />
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-1">
            <section className="grid grid-cols-2 auto-cols-min size-4/5 gap-6 p-6">
              <div className="relative bg-blue-600 h-60 text-white p-4 rounded-xl">
                <h3 className="text-xl font-semibold">Jumlah Karyawan</h3>
                <p className="text-4xl mt-5 font-bold">%%</p>
                <div className="absolute bottom-2 right-2">
                  <FiCheckCircle size={110} />
                </div>
              </div>
              <div className="relative bg-green-600 h-60 text-white p-4 rounded-xl">
                <h3 className="text-xl font-semibold">Masuk</h3>
                <p className="text-4xl mt-5 font-bold">%%</p>
                <div className="absolute bottom-2 right-2">
                  <BiLogIn size={110} />
                </div>
              </div>
              <div className="relative bg-red-600 h-60 text-white p-4 rounded-xl">
                <h3 className="text-xl font-semibold">Tidak Masuk</h3>
                <p className="text-4xl mt-5 font-bold">%%</p>
                <div className="absolute bottom-2 right-2">
                  <BiLogOut size={110} />
                </div>
              </div>
              <div className="relative bg-orange-600 h-60 text-white p-4 rounded-xl">
                <h3 className="text-xl font-semibold">Izin</h3>
                <p className="text-4xl mt-5 font-bold">%%</p>
                <div className="absolute bottom-2 right-2">
                  <MdOutlineDoNotDisturbOn size={110} />
                </div>
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
