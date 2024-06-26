import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { IoIosSearch } from "react-icons/io";
import { MdGroups2 } from "react-icons/md";

const Project = ({ activities }) => {
  const [visibleActivities, setVisibleActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  const projects = [
    {
      name: "Web Presensi",
      members: 20,
      icon: <MdGroups2 className="text-white w-8 h-8" />,
    },
    {
      name: "Web Presensi",
      members: 20,
      icon: <MdGroups2 className="text-white w-8 h-8" />,
    },
    {
      name: "Web Presensi",
      members: 20,
      icon: <MdGroups2 className="text-white w-8 h-8" />,
    },
    {
      name: "Web Presensi",
      members: 20,
      icon: <MdGroups2 className="text-white w-8 h-8" />,
    },
    {
      name: "Web Presensi",
      members: 20,
      icon: <MdGroups2 className="text-white w-8 h-8" />,
    },
    {
      name: "Web Presensi",
      members: 20,
      icon: <MdGroups2 className="text-white w-8 h-8" />,
    },
    {
      name: "Web Presensi",
      members: 20,
      icon: <MdGroups2 className="text-white w-8 h-8" />,
    },
    {
      name: "Web Presensi",
      members: 20,
      icon: <MdGroups2 className="text-white w-8 h-8" />,
    },
    {
      name: "Web Presensi",
      members: 20,
      icon: <MdGroups2 className="text-white w-8 h-8" />,
    },
    // Add more projects as needed
  ];

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

  useEffect(() => {
    const lowercasedFilter = searchQuery.toLowerCase();
    const filteredData = projects.filter((item) =>
      item.name.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredProjects(filteredData);
  }, [searchQuery]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 w-full">
        <Navbar />
        <div className="px-10 pt-5">
          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-10">
              <Link to="/Divisi">
                <h2 className="text-2xl font-bold cursor-pointer">Divisi</h2>
              </Link>
              <h2 className="text-2xl font-bold border-b-2 border-black">
                Project
              </h2>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Cari Project"
                className="border border-gray-300 rounded px-10 py-2 w-96"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IoIosSearch className="absolute left-2 top-2 text-gray-400 w-6 h-6" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-10">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="relative bg-blue-950 text-white shadow-lg rounded-lg flex flex-col justify-between"
                style={{ height: "200px", width: "380px" }}
              >
                <div className="p-5 flex justify-center items-center">
                  <p className="font-bold text-lg">{project.name}</p>
                </div>
                <div className="flex justify-around items-center flex-grow">
                  <MdGroups2 className="text-white size-32" />
                  <p className="text-lg place">{project.members} Orang</p>
                </div>
                <div className="bg-white text-black text-center py-2 rounded-b-lg">
                  View Detail
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Project;
