import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { PiCodeSimpleLight } from "react-icons/pi";
import { CiPen } from "react-icons/ci";
import { CiCamera } from "react-icons/ci";
import { BsCameraVideo } from "react-icons/bs";
import { FaPalette } from "react-icons/fa6";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { PiNotePencil } from "react-icons/pi";
import { LiaHandshake } from "react-icons/lia";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FiThumbsUp } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa6";
import { MdBusinessCenter } from "react-icons/md";
import { GoFileDirectory } from "react-icons/go";
import { IoIosSearch } from "react-icons/io"; // Import the search icon

const Divisi = ({ activities }) => {
  const [visibleActivities, setVisibleActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDivisions, setFilteredDivisions] = useState([]);

  const divisions = [
    {
      name: "UI/UX Designer",
      members: 20,
      icon: <CiPen className="text-white w-8 h-8" />,
    },
    {
      name: "Digital Marketing",
      members: 20,
      icon: <HiOutlineSpeakerphone className="text-white w-8 h-8" />,
    },
    {
      name: "Social Media Specialist",
      members: 20,
      icon: <FiThumbsUp className="text-white w-8 h-8" />,
    },
    {
      name: "Programmer",
      members: 20,
      icon: <PiCodeSimpleLight className="text-white w-8 h-8" />,
    },
    {
      name: "Marketing Communication",
      members: 20,
      icon: <LiaHandshake className="text-white w-8 h-8" />,
    },
    {
      name: "Tiktok Creator",
      members: 20,
      icon: <FaTiktok className="text-white w-8 h-8" />,
    },
    {
      name: "Desain Grafis",
      members: 20,
      icon: <FaPalette className="text-white w-8 h-8" />,
    },
    {
      name: "Content Writer",
      members: 20,
      icon: <PiNotePencil className="text-white w-8 h-8" />,
    },
    {
      name: "Administrasi",
      members: 20,
      icon: <MdBusinessCenter className="text-white w-8 h-8" />,
    },
    {
      name: "Fotografer",
      members: 20,
      icon: <CiCamera className="text-white w-8 h-8" />,
    },
    {
      name: "Human Resource",
      members: 20,
      icon: <HiMiniUserGroup className="text-white w-8 h-8" />,
    },
    {
      name: "Project Manager",
      members: 20,
      icon: <GoFileDirectory className="text-white w-8 h-8" />,
    },
    {
      name: "Videografer",
      members: 20,
      icon: <BsCameraVideo className="text-white w-8 h-8" />,
    },
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
    const filteredData = divisions.filter((item) =>
      item.name.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredDivisions(filteredData);
  }, [searchQuery]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 w-full">
        <Navbar />
        <div className="px-10 pt-5">
          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-10">
              <h2 className="text-2xl font-bold">Divisi</h2>
              <h2 className="text-2xl font-bold">Project</h2>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Cari Devisi / Project"
                className="border border-gray-300 rounded px-10 py-2 w-96"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IoIosSearch className="absolute left-2 top-2 text-gray-400 w-6 h-6" />
            </div>
          </div>
          <div>
            <Link to={"/TambahKaryawan"}>
              <button className="bg-blue-900 text-white px-8 py-2 rounded-2xl mb-8">
                Tambah Anggota
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {filteredDivisions.map((division, index) => (
              <div
                key={index}
                className="bg-white shadow rounded p-4 flex items-center"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-900 rounded-full p-2">
                    {typeof division.icon === "string" ? (
                      <img
                        src={`/assets/icons/${division.icon}.svg`} // Adjust the path according to your assets
                        alt={division.name}
                        className="w-8 h-8"
                      />
                    ) : (
                      division.icon
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{division.name}</p>
                    <p className="text-sm text-gray-600">
                      {division.members} Anggota
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Divisi;
