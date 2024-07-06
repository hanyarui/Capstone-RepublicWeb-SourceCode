import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { LuFileClock } from "react-icons/lu";
import Header from "./HeaderLaptop";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Function to Get Current Date
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

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

    // Mock API call to save data
    await fetch(
      "https://republikweb-cp-backend.vercel.app/attendance/activitylog",
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

const HomepageLaptop = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLogPopupVisible, setIsLogPopupVisible] = useState(false);
  const [logActivityText, setLogActivityText] = useState("");
  const [currentMasukTime, setCurrentMasukTime] = useState("---");
  const [currentIstirahatTime, setCurrentIstirahatTime] = useState("---");
  const [currentKembaliTime, setCurrentKembaliTime] = useState("---");
  const [currentPulangTime, setCurrentPulangTime] = useState("---");
  const [currentStep, setCurrentStep] = useState(0);
  const [isIconRed, setIsIconRed] = useState(false);

  // Get karyawanId from token
  const token = Cookies.get("token");
  let karyawanId = "";
  if (token) {
    const decodedToken = jwtDecode(token);
    karyawanId = decodedToken.karyawanId;
  }

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

  const handleConfirm = async () => {
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

  // Navigate to History Log Activity Page
  let navigate = useNavigate();

  // Handle Log Activity Pop-up
  const popupLogActivity = () => {
    setIsLogPopupVisible(true);
  };

  const handleLogConfirm = () => {
    console.log("Log Activity:", logActivityText);
    setIsLogPopupVisible(false);
    setLogActivityText(""); // Reset text field after confirmation
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
    <div className="min-h-screen w-screen bg-white flex flex-col items-center p-0">
      {/* Header */}
      <Header />
      <div className="w-full px-16 py-12">
        <div className="grid grid-cols-3 gap-6">
          {/* Shift Middle */}
          <div className="text-center my-auto">
            <h2 className="text-3xl font-bold mb-4">Shift Middle</h2>
            <button
              onClick={handleButtonClick}
              className="p-4 text-white text-xl w-8/12 mb-4"
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
                    onClick={handleConfirm}
                    className="mt-3 p-2 bg-blue-500 text-white rounded"
                  >
                    Konfirmasi
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={popupLogActivity}
              className="p-4 text-white w-8/12 mb-4"
              style={{ backgroundColor: "#040F4D", borderRadius: "20px" }}
            >
              <div className="flex items-center justify-center">
                <RiStickyNoteAddFill className="size-8 mr-3" />
                Log Activity
              </div>
            </button>
            {isLogPopupVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-2 rounded-lg">
                  <textarea
                    value={logActivityText}
                    onChange={(e) => setLogActivityText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-3"
                    placeholder="Masukkan aktivitas log anda..."
                  />
                  <button
                    onClick={saveActivityData}
                    className="p-2 bg-blue-500 text-white rounded"
                  >
                    Konfirmasi
                  </button>
                </div>
              </div>
            )}
            <button
              onClick={moveToHistoryLogActivity}
              className="p-4 text-white w-8/12"
              style={{ backgroundColor: "#040F4D", borderRadius: "20px" }}
            >
              <div className="flex items-center justify-center">
                <LuFileClock className="size-8 mr-3" />
                Histori Log Activity
              </div>
            </button>
          </div>

          {/* Right Components */}
          <div className="col-span-2">
            <div className="flex justify-end mb-4">
              <button className="text-red-600">Lihat Barcode Saya</button>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
              {/* Masuk Kerja Indicator */}
              <div
                className="text-left py-5 px-7 font-extrabold bg-gray-200 flex items-center justify-start w-full h-32"
                style={{ borderRadius: "10px" }}
              >
                <div className="grid">
                  <div className="grid grid-cols-3 items-center">
                    <GoDotFill
                      className={`${
                        isIconRed && currentStep > 0
                          ? "text-red-600"
                          : "text-black"
                      }`}
                    />
                    <p className="font-bold col-span-2">Masuk</p>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div></div>
                    <p className="col-span-2 font-medium">{currentMasukTime}</p>
                  </div>
                </div>
              </div>

              {/* Istirahat Kerja Indicator */}
              <div
                className="text-left py-5 px-7 font-extrabold bg-gray-200 flex items-center justify-start w-full w-72 h-32"
                style={{ borderRadius: "10px" }}
              >
                <div className="grid">
                  <div className="grid grid-cols-3 items-center">
                    <GoDotFill
                      className={`${
                        isIconRed && currentStep > 1
                          ? "text-red-600"
                          : "text-black"
                      }`}
                    />
                    <p className="font-bold col-span-2">Istirahat</p>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div></div>
                    <p className="col-span-2 font-medium">
                      {currentIstirahatTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Kembali Kerja Indicator */}
              <div
                className="text-left py-5 px-7 font-extrabold bg-gray-200 flex items-center justify-start w-full w-72 h-32"
                style={{ borderRadius: "10px" }}
              >
                <div className="grid">
                  <div className="grid grid-cols-3 items-center">
                    <GoDotFill
                      className={`${
                        isIconRed && currentStep > 2
                          ? "text-red-600"
                          : "text-black"
                      }`}
                    />
                    <p className="font-bold col-span-2">Kembali</p>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div></div>
                    <p className="col-span-2 font-medium">
                      {currentKembaliTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pulang Kerja Indicator */}
              <div
                className="text-left py-5 px-7 font-extrabold bg-gray-200 flex items-center justify-start w-full w-72 h-32"
                style={{ borderRadius: "10px" }}
              >
                <div className="grid">
                  <div className="grid grid-cols-3 items-center">
                    <GoDotFill
                      className={`${
                        isIconRed && currentStep > 3
                          ? "text-red-600"
                          : "text-black"
                      }`}
                    />
                    <p className="font-bold col-span-2">Pulang</p>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div></div>
                    <p className="col-span-2 font-medium">
                      {currentPulangTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Components */}
            {/* Attention */}
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="text-red-700 text-center">
                <strong>Attention!</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Pesan Atenttion */}
              <div className="bg-white border border-red-500 p-16 rounded-md">
                <div className="text-red-700 text-center">
                  <p>• Kemarin anda absen pulang di kost jangan diulang!</p>
                </div>
              </div>

              {/* Kurang Jam Kerja */}
              <div className="bg-white border border-red-500 p-4 rounded-lg">
                <div className="text-red-700 font-semibold text-center mb-2">
                  Anda memiliki kekurangan jam kerja
                </div>
                <div className="text-red-700 text-2xl text-center mt-2">
                  -14:01:53
                </div>
                <div className="text-center">
                  <button className="text-blue-600 mt-2">Lihat Detail</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageLaptop;
