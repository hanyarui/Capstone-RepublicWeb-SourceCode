import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "https://republikweb-cp-backend.vercel.app/projects"
        );

        if (Array.isArray(response.data)) {
          const project = response.data.find(
            (proj) => proj.id.toString() === projectId
          );
          setProject(project);
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [projectId]);

  const filteredMembers =
    project?.members.filter((member) =>
      member.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

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
              Filter Data Anggota
            </h1>
          </div>
          <div className="bg-white shadow rounded p-4 mb-4">
            <div className="flex space-x-2 items-center">
              <input type="checkbox" className="form-checkbox" />
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>Bulk Action</option>
                <option>Action 1</option>
                <option>Action 2</option>
              </select>
              <button className="bg-blue-900 text-white px-4 py-1 rounded">
                Apply
              </button>
              <span className="text-lg font-semibold mr-2">Project :</span>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>Pilih Project</option>
                <option>Project 1</option>
                <option>Project 2</option>
              </select>
            </div>
          </div>
          <div className="bg-blue-950 p-4 rounded">
            {filteredMembers.map((member, index) => (
              <div key={index} className="bg-white shadow rounded p-4 mb-4">
                <div className="bg-blue-900 text-white p-4 rounded mb-2">
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
