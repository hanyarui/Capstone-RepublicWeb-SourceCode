import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { IoIosSearch } from "react-icons/io";
import { MdGroups2 } from "react-icons/md";
import { FaArrowCircleRight } from "react-icons/fa";
import Select, { components } from "react-select";
import axios from "axios";
import Cookies from "js-cookie";

const Project = ({ activities }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLogPopupVisible, setIsLogPopupVisible] = useState(false);
  const [visibleActivities, setVisibleActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    projectname: "",
    members: [],
    description: "",
    startdate: "",
    enddate: "",
  });
  const [employeeOptions, setEmployeeOptions] = useState([]); // State untuk menyimpan opsi karyawan
  const [selectedEmployees, setSelectedEmployees] = useState([]); // State untuk menyimpan karyawan yang dipilih

  // Fungsi untuk mengambil data karyawan dari API
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "https://republikweb-cp-backend.vercel.app/karyawan"
      );
      if (response.status === 200) {
        // Format data menjadi opsi untuk dropdown
        const formattedEmployees = response.data.map((employee) => ({
          value: employee.karyawan_id,
          label: employee.fullname,
        }));
        setEmployeeOptions(formattedEmployees);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees(); // Ambil data karyawan saat komponen dimount
  }, []);

  const handleChange = (selectedOptions) => {
    setSelectedEmployees(selectedOptions);
    setNewProject({
      ...newProject,
      members: selectedOptions.map((option) => option.label), // Simpan nama karyawan yang dipilih
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value,
    });
  };

  const handleConfirmProject = async () => {
    const token = Cookies.get("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.post(
        `https://republikweb-cp-backend.vercel.app/projects`,
        newProject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Project created successfully", response.data);
        setIsLogPopupVisible(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

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

  const popupProject = () => {
    setIsLogPopupVisible(true);
  };

  const closePopup = () => {
    setIsLogPopupVisible(false);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    fetchProjects(e.target.value);
  };

  const fetchProjects = async (projectname = "") => {
    const token = Cookies.get("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.get(
        `https://republikweb-cp-backend.vercel.app/projects?search=${projectname}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const projectsData = response.data;
        setProjects(projectsData);
        setFilteredProjects(projectsData); // Set filtered projects initially
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 w-full overflow-hidden">
        <Navbar />
        <div className="px-10 pt-5 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
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
                onChange={handleSearch}
              />
              <IoIosSearch className="absolute left-2 top-2 text-gray-400 w-6 h-6" />
            </div>
          </div>
          <div className="mb-8">
            <button
              onClick={popupProject}
              className="bg-blue-950 text-white px-8 py-2 rounded-2xl mb-8"
            >
              Tambah Project
            </button>
          </div>
          <div className="flex-grow overflow-y-auto">
            <div className="grid grid-cols-4 gap-10">
              {filteredProjects?.map((project, index) => (
                <Link
                  key={index}
                  to={`/DetailProject/${encodeURIComponent(project.projectId)}`}
                  className="relative bg-blue-950 text-white shadow-lg rounded-t-lg flex flex-col justify-between"
                  style={{
                    height: "150px",
                    width: "280px",
                    textDecoration: "none",
                  }}
                >
                  <div className="p-5 flex justify-center items-center">
                    <p className="font-bold text-lg">{project.projectname}</p>
                  </div>
                  <div className="flex justify-around items-center flex-grow">
                    <MdGroups2 className="text-white size-20" />
                    <p className="text-lg">{project.members.length} Orang</p>
                  </div>
                  <div className="bg-white text-black text-left py-1 rounded-b-lg pl-4 pr-4 flex justify-between items-center">
                    View Detail
                    <FaArrowCircleRight />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {isLogPopupVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-max h-max bg-white p-7 rounded-3xl relative">
                <button
                  onClick={closePopup}
                  className="absolute top-6 right-9 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
                <div className="mb-3 text-start font-bold text-lg">
                  Tambah Project Baru
                </div>
                <label>Nama Project</label>
                <input
                  name="projectname"
                  value={newProject.projectname}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg mt-1 mb-3"
                  placeholder="Masukkan Nama Project"
                />
                <label>Anggota Project</label>
                <div className="mt-1 mb-3">
                  <Select
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{ Option: CheckboxOption }}
                    onChange={handleChange}
                    options={employeeOptions} // Set opsi untuk dropdown list
                    placeholder="Pilih Anggota Project"
                    value={selectedEmployees} // Set nilai yang dipilih
                  />
                </div>
                <label>Deskripsi</label>
                <input
                  name="description"
                  value={newProject.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg mt-1 mb-3"
                  placeholder="Masukkan Deskripsi Project"
                />
                <label>Tanggal Mulai</label>
                <input
                  name="startdate"
                  value={newProject.startdate}
                  onChange={handleInputChange}
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-lg mt-1 mb-3"
                />
                <label>Tanggal Selesai</label>
                <input
                  name="enddate"
                  value={newProject.enddate}
                  onChange={handleInputChange}
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-lg mt-1 mb-3"
                />
                <button
                  onClick={handleConfirmProject}
                  className="w-full bg-blue-950 text-white py-2 rounded-xl"
                >
                  Tambah Project
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const CheckboxOption = (props) => {
  return (
    <components.Option {...props}>
      <input type="checkbox" checked={props.isSelected} onChange={() => null} />{" "}
      <label>{props.label}</label>
    </components.Option>
  );
};

export default Project;
