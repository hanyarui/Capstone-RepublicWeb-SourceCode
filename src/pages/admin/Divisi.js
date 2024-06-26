import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { IoMdCode } from "react-icons/io";
import { CiPen } from "react-icons/ci";
import { IoCameraOutline } from "react-icons/io5";
import { BsCameraVideo } from "react-icons/bs";
import { PiPalette } from "react-icons/pi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { PiNotePencil } from "react-icons/pi";
import { LiaHandshake } from "react-icons/lia";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { PiThumbsUp } from "react-icons/pi";
import { PiTiktokLogo } from "react-icons/pi";
import { BsFolder2 } from "react-icons/bs";
import { GoFileDirectory } from "react-icons/go";
import { IoIosSearch } from "react-icons/io"; // Import the search icon

const Divisi = ({ activities }) => {
  const [visibleActivities, setVisibleActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDivisions, setFilteredDivisions] = useState([]);

  const navigate = useNavigate();

  const divisions = [
    {
      name: "UI & U0X Designer",
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
      icon: <PiThumbsUp className="text-white w-8 h-8" />,
    },
    {
      name: "Programmer",
      members: 20,
      icon: <IoMdCode className="text-white w-8 h-8" />,
    },
    {
      name: "Marketing Communication",
      members: 20,
      icon: <LiaHandshake className="text-white w-8 h-8" />,
    },
    {
      name: "Tiktok Creator",
      members: 20,
      icon: <PiTiktokLogo className="text-white w-8 h-8" />,
    },
    {
      name: "Desain Grafis",
      members: 20,
      icon: <PiPalette className="text-white w-8 h-8" />,
    },
    {
      name: "Content Writer",
      members: 20,
      icon: <PiNotePencil className="text-white w-8 h-8" />,
    },
    {
      name: "Administrasi",
      members: 20,
      icon: <BsFolder2 className="text-white w-8 h-8" />,
    },
    {
      name: "Fotografer",
      members: 20,
      icon: <IoCameraOutline className="text-white w-8 h-8" />,
    },
    {
      name: "Human Resource",
      members: 20,
      icon: <HiOutlineUserGroup className="text-white w-8 h-8" />,
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
              <h2 className="text-2xl font-bold border-b-2 border-black">
                Divisi
              </h2>
              <Link to="/Project">
                <h2 className="text-2xl font-bold cursor-pointer">Project</h2>
              </Link>
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
              <button className="bg-blue-950 text-white px-8 py-2 rounded-2xl mb-8">
                Tambah Anggota
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {filteredDivisions.map((division, index) => (
              <div
                key={index}
                className="bg-white shadow rounded p-4 flex items-center cursor-pointer"
                onClick={() => navigate(`/division/${division.name}`)}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-950 rounded-full p-2">
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
