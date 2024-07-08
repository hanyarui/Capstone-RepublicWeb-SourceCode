import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { IoIosSearch } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";

const DetailProject = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      const token = Cookies.get("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get(
          `https://republikweb-cp-backend.vercel.app/projects/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setProject(response.data);
        } else {
          console.error("Invalid response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [projectId]);

  const filteredMembers =
    project?.members.filter((member) =>
      member.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const convertTimestampToDate = (timestamp) => {
    return new Date(timestamp._seconds * 1000).toISOString().split("T")[0];
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 w-full">
        <Navbar />
        <div className="px-10 pt-5">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center space-x-2">
              <button className="text-xl" onClick={() => navigate("/Project")}>
                <IoChevronBackOutline size={32} />
              </button>
              <h1 className="text-3xl font-bold">{project?.projectname}</h1>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Cari Anggota Project"
                className="border border-gray-300 rounded px-10 py-2 w-96"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IoIosSearch className="absolute left-2 top-2 text-gray-400 w-6 h-6" />
            </div>
          </div>
          <div className="bg-blue-950 shadow rounded p-4 mb-0">
            <h1 className="text-lg text-white font-medium mb-0">
              {project?.description}
            </h1>
          </div>
          <div className="bg-white shadow rounded p-4 mb-4">
            <div className="items-center">
              <p>
                Tanggal Mulai:{" "}
                {project ? convertTimestampToDate(project.startdate) : ""}
              </p>
              <p>
                Tanggal Selesai:{" "}
                {project ? convertTimestampToDate(project.enddate) : ""}
              </p>
            </div>
          </div>
          <div className="flex rounded w-max">
            {filteredMembers.map((member, index) => (
              <div key={index} className="mr-5">
                <div className="bg-blue-900 text-white px-8 py-4 rounded mb-2">
                  <p className="font-mono">{member}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailProject;
