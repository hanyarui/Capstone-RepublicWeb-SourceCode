import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { LuFileClock } from "react-icons/lu";
import Header from "./HeaderHp";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Function to Format Time (Hours and Minutes)
const formatTime = (timeString) => {
  if (!timeString) return "---"; // Handle case where timeString is undefined or null
  const date = new Date(timeString);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedHours = String(hours).padStart(2, "0");

  return `${formattedHours}:${minutes}:${seconds} ${ampm}`;
};

// Mock API Call to Save Data
const saveAttendanceData = async (data) => {
  try {
    const token = Cookies.get("token"); // Get token from cookies

    if (!token) {
      console.error("No token found in cookies");
      return;
    }

    // Mock API call to save data
    await fetch(
      "https://republikweb-cp-backend.vercel.app/attendance/checkin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token to headers
        },
        body: JSON.stringify(data),
      }
    );
  } catch (error) {
    console.error("Error saving attendance data:", error);
  }
};

const saveActivityData = async (data) => {
  try {
    const token = Cookies.get("token"); // Get token from cookies

    if (!token) {
      console.error("No token found in cookies");
      return;
    }

    // API call to save data
    const response = await fetch(
      "https://republikweb-cp-backend.vercel.app/activitylog",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token to headers
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error saving activity data");
    }

    console.log("Activity data saved successfully");
  } catch (error) {
    console.error("Error saving activity data:", error.message);
  }
};

// Function to Get Attendance Data
const getAttendanceData = async (karyawanId) => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found in cookies");
      return null;
    }

    const response = await fetch(
      `https://republikweb-cp-backend.vercel.app/attendance-today/${karyawanId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token to headers
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch attendance data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    return null;
  }
};

// API Call to Get Debt Time Data
const getDebtTimeData = async (karyawanId) => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found in cookies");
      return null;
    }

    const response = await fetch(
      `https://republikweb-cp-backend.vercel.app/debttime/total/${karyawanId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch debt time data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching debt time data:", error);
    return null;
  }
};

const Homepage = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLogPopupVisible, setIsLogPopupVisible] = useState(false);
  const [logActivityText, setLogActivityText] = useState("");

  const [currentMasukTime, setCurrentMasukTime] = useState("---");
  const [currentIstirahatTime, setCurrentIstirahatTime] = useState("---");
  const [currentKembaliTime, setCurrentKembaliTime] = useState("---");
  const [currentPulangTime, setCurrentPulangTime] = useState("---");

  const [currentStep, setCurrentStep] = useState(0);
  const [isIconRed, setIsIconRed] = useState(false);

  const [totalDebtTime, setTotalDebtTime] = useState(0);
  const [formattedTime, setFormattedTime] = useState("00:00");

  // Get karyawanId from token
  const token = Cookies.get("token");
  let karyawanId = "";
  if (token) {
    const decodedToken = jwtDecode(token);
    karyawanId = decodedToken.karyawanId;
  }

  useEffect(() => {
    const fetchTotalDebtTime = async () => {
      const data = await getDebtTimeData(karyawanId);
      if (data) {
        setTotalDebtTime(data.totalDebtTime);

        // Convert total debt time from minutes to HH:MM:SS format
        const totalSeconds = data.totalDebtTime * 60; // convert minutes to seconds
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setFormattedTime(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }
    };

    fetchTotalDebtTime();
  }, [karyawanId]);

  // UseEffect to Fetch Attendance Data
  useEffect(() => {
    (async () => {
      const data = await getAttendanceData(karyawanId);
      if (data) {
        setCurrentMasukTime(formatTime(data.checkInTimes.start));
        setCurrentIstirahatTime(formatTime(data.checkInTimes.break));
        setCurrentKembaliTime(formatTime(data.checkInTimes.resume));
        setCurrentPulangTime(formatTime(data.checkInTimes.end));

        // Set currentStep based on available data
        let step = 0;
        if (data.checkInTimes.start) step = 1;
        if (data.checkInTimes.break) step = 2;
        if (data.checkInTimes.resume) step = 3;
        if (data.checkInTimes.end) step = 4;
        setCurrentStep(step);
      }
    })();
  }, [currentStep]); // add currentStep as dependency to fetch latest data

  // Button Click Handlers
  const handleButtonClick = () => {
    setIsPopupVisible(true);
  };

  const handleConfirmCheckIn = async () => {
    setIsPopupVisible(false);
    setIsIconRed(true);

    let type = "";

    if (currentStep === 0) {
      type = "start";
    } else if (currentStep === 1) {
      type = "break";
    } else if (currentStep === 2) {
      type = "resume";
    } else if (currentStep === 3) {
      type = "end";
    }

    const attendanceData = {
      step: getButtonText().toLowerCase(),
      type,
    };
    await saveAttendanceData(attendanceData);

    setCurrentStep(currentStep + 1);
  };

  const handleConfirmActivity = async () => {
    if (!logActivityText.trim()) {
      console.error("Activity log text is empty");
      return;
    }

    const data = {
      description: logActivityText,
    };

    await saveActivityData(data);

    window.location.reload();
  };

  // Navigate to History Log Activity Page
  let navigate = useNavigate();

  // Handle Log Activity Pop-up
  const popupLogActivity = () => {
    setIsLogPopupVisible(true);
  };

  const moveToHistoryLogActivity = () => {
    navigate("/HistoryLogActivity");
  };

  // Button Text based on current step
  const getButtonText = () => {
    if (currentStep === 0) return "Masuk";
    if (currentStep === 1) return "Istirahat";
    if (currentStep === 2) return "Kembali";
    if (currentStep === 3) return "Pulang";
    return "Selesai";
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-0">
      <Header />
      <div className="w-full px-4 pt-6 flex justify-end items-center bg-white text-black">
        <button className="text-red-600">Lihat Barcode Saya</button>
      </div>
      <div className="w-full px-4 py-6 text-center bg-white">
        <h2 className="text-2xl font-bold mb-4">Shift Middle</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-200 py-5 px-3 rounded-md">
            <div className="grid grid-cols-5 items-center">
              <GoDotFill
                className={`${
                  isIconRed && currentStep > 0 ? "text-red-600" : "text-black"
                }`}
              />
              <p className="font-bold col-span-4 text-start">Masuk</p>
            </div>
            <div className="ml-8">
              <p className="text-start font-medium text-base">
                {currentMasukTime}
              </p>
              {/* <p className="text-start text-red-600 text-sm">-Telat Masuk</p> */}
            </div>
          </div>
          <div className="bg-gray-200 py-5 px-3 rounded-md">
            <div className="grid grid-cols-5 items-center">
              <GoDotFill
                className={`${
                  isIconRed && currentStep > 1 ? "text-red-600" : "text-black"
                }`}
              />
              <p className="font-bold col-span-4 text-start">Istirahat</p>
            </div>
            <div className="ml-9">
              <p className="text-start font-medium">{currentIstirahatTime}</p>
            </div>
          </div>
          <div className="bg-gray-200 py-5 px-3 rounded-md">
            <div className="grid grid-cols-5 items-center">
              <GoDotFill
                className={`${
                  isIconRed && currentStep > 2 ? "text-red-600" : "text-black"
                }`}
              />
              <p className="font-bold col-span-4 text-start">Kembali</p>
            </div>
            <div className="ml-9">
              <p className="text-start font-medium">{currentKembaliTime}</p>
            </div>
          </div>
          <div className="bg-gray-200 py-5 px-3 rounded-md">
            <div className="grid grid-cols-5 items-center">
              <GoDotFill
                className={`${
                  isIconRed && currentStep > 3 ? "text-red-600" : "text-black"
                }`}
              />
              <p className="font-bold col-span-4 text-start">Pulang</p>
            </div>
            <div className="ml-9">
              <p className="text-start font-medium">{currentPulangTime}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 pt-6 pb-20 text-center bg-white">
        <div className="text-red-700">
          <strong>Attention!</strong>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-white border border-red-500 p-4 rounded-md">
            <p className="text-red-700">
              • Kemarin anda absen pulang di kost jangan diulang!
            </p>
          </div>
          <div className="bg-white border border-red-500 p-4 rounded-md">
            <div className="text-red-700 font-semibold">
              Anda memiliki kekurangan jam kerja
            </div>
            <div className="text-red-700 text-2xl mt-2">-{formattedTime}</div>
            <div className="mt-2">
              <button className="text-blue-600">Lihat Detail</button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 py-6 bg-white">
        <div className="fixed bottom-0 left-0 w-full flex justify-between p-2 bg-white border-t border-gray-300">
          <button
            onClick={handleButtonClick}
            className="p-4 text-white text-xl font-semibold w-full"
            style={{ backgroundColor: "#040F4D", borderRadius: "20px" }}
            disabled={currentStep > 3}
          >
            {getButtonText()}
          </button>
          {isPopupVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-5 rounded-lg">
                <p>Anda telah {getButtonText().toLowerCase()}</p>
                <button
                  onClick={handleConfirmCheckIn}
                  className="mt-3 p-2 bg-blue-500 text-white rounded"
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          )}
          <button
            onClick={popupLogActivity}
            className="w-max text-white rounded-md mx-2"
            style={{ backgroundColor: "#040F4D", borderRadius: "20px" }}
            // onClick={moveToLogActivity}
          >
            <RiStickyNoteAddFill className="size-6 mx-8" />
          </button>
          {isLogPopupVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-10/12 h-2/5 bg-white p-3 rounded-2xl">
                <div className="mb-3 text-start font-bold text-lg">
                  Log Activity
                </div>
                <input
                  value={logActivityText}
                  onChange={(e) => setLogActivityText(e.target.value)}
                  className="w-full h-2/3 p-2 border border-gray-300 rounded-lg mb-3"
                  placeholder="Masukkan aktivitas log anda..."
                />
                <button
                  onClick={handleConfirmActivity}
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          )}
          <button
            onClick={moveToHistoryLogActivity}
            className="w-max text-white rounded-md"
            style={{ backgroundColor: "#040F4D", borderRadius: "20px" }}
          >
            <LuFileClock className="size-6 mx-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
