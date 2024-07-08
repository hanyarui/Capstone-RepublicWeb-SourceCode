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

  const employeeData = [
    { value: "1", label: "John Doe" },
    { value: "2", label: "Jane Smith" },
    { value: "3", label: "Jack Brown" },
    // Tambahkan data karyawan lainnya sesuai kebutuhan
  ];

  const CheckboxOption = (props) => {
    return (
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    );
  };

  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedEmployees(selectedOptions);
    setNewProject({
      ...newProject,
      members: selectedOptions.map((option) => option.label),
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
    const token = Cookies.get("token"); // Assuming the token is stored in a cookie named 'token'

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.post(
        "https://republikweb-cp-backend.vercel.app/projects",
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
        // Optionally update the UI or fetch new data here
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const convertTimestampToDate = (timestamp) => {
    return new Date(timestamp._seconds * 1000).toISOString().split("T")[0];
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

  useEffect(() => {
    const lowercasedFilter = searchQuery.toLowerCase();
    const filteredData = projects?.filter((item) =>
      item.projectname.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredProjects(filteredData || []);
  }, [searchQuery, projects]);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = Cookies.get("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get(
          "https://republikweb-cp-backend.vercel.app/projects",
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

    fetchProjects();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 w-full">
        <Navbar />
        <div className="px-10 pt-5">
          <div className="flex justify-between items-center mb-10">
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
                placeholder="Search Project"
                className="border border-gray-300 rounded px-10 py-2 w-96"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IoIosSearch className="absolute left-2 top-2 text-gray-400 w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-wrap justify-start space-x-4">
            {filteredProjects.map((project, index) => (
              <Link
                key={index}
                to={`/DetailProject/${project.projectId}`}
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
      </main>
    </div>
  );
};

export default Project;
