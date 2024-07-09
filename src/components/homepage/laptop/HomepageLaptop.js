import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { LuFileClock } from "react-icons/lu";
import Header from "./HeaderLaptop";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import ClipLoader from "react-spinners/ClipLoader";

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

// Function to fetch QR code URL based on karyawanId
const fetchQrCode = async (karyawanId) => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found in cookies");
      return null;
    }

    const response = await fetch(
      `https://republikweb-cp-backend.vercel.app/karyawan/${karyawanId}/barcode`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to fetch QR code");
    }

    const data = await response.json();
    return data.gambar_qr; // Assuming this is the filename of the QR code image
  } catch (error) {
    console.error("Error fetching QR code:", error);
    return null;
  }
};

const HomepageLaptop = () => {
  const [loading, setLoading] = useState(true);
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

  // State for showing barcode popup
  const [isQrCodeVisible, setIsQrCodeVisible] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

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
    setLoading(false);
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
    setLoading(false);
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

    setIsLogPopupVisible(false); // Close the log activity popup after saving
    setLogActivityText(""); // Clear the input field after saving
  };

  // Popup functions
  const popupLogActivity = () => {
    setIsLogPopupVisible(true);
  };

  // Move to History Log Activity
  const navigate = useNavigate();
  const moveToHistoryLogActivity = () => {
    navigate("/HistoryLogActivity");
  };

  // Function to get button text based on current step
  const getButtonText = () => {
    if (currentStep === 0) return "Masuk";
    if (currentStep === 1) return "Istirahat";
    if (currentStep === 2) return "Kembali";
    if (currentStep === 3) return "Pulang";
    return "Selesai";
  };

  // Function to toggle QR code popup and fetch QR code URL
  const toggleQrCodePopup = async () => {
    if (!isQrCodeVisible) {
      const qrCodeFileName = await fetchQrCode(karyawanId); // Fetch gambar_qr (filename)
      if (qrCodeFileName) {
        // Construct the URL to the image based on your storage or hosting
        const url = `https://firebasestorage.googleapis.com/v0/b/republikweb-presence-system.appspot.com/o/${qrCodeFileName}?alt=media`; // Replace with your actual URL
        setQrCodeUrl(url);
      }
    }
    setIsQrCodeVisible(!isQrCodeVisible);
  };

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col items-center p-0">
      <Header />
      <div className="w-full px-4 md:px-16 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center md:text-auto mt-16">
            <h2 className="text-3xl font-bold mb-4">Shift Middle</h2>
            <button
              onClick={handleButtonClick}
              className={`p-4 text-white text-xl w-3/5 ${
                currentStep > 3
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-950"
              } rounded-xl`}
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
              className="p-4 text-white w-3/5 mt-4 bg-blue-950 rounded-xl"
            >
              <div className="flex items-center justify-center">
                <RiStickyNoteAddFill className="mr-3" />
                Log Activity
              </div>
            </button>
            {isLogPopupVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-1/3 h-1/3 bg-white p-5 rounded-2xl">
                  <div className="flex justify-between mb-3">
                    <div className=" text-center font-bold text-lg">
                      Log Activity
                    </div>
                    <button
                      onClick={() => setIsLogPopupVisible(false)}
                      className="size-7"
                    >
                      X
                    </button>
                  </div>
                  <input
                    value={logActivityText}
                    onChange={(e) => setLogActivityText(e.target.value)}
                    className="w-full h-1/2 p-2 border border-gray-300 rounded-lg mb-3 text-center"
                    placeholder="Masukkan aktivitas log anda..."
                  />
                  <button
                    onClick={handleConfirmActivity}
                    className="mt-3 p-2 bg-blue-500 text-white rounded"
                  >
                    Konfirmasi
                  </button>
                </div>
              </div>
            )}
            <button
              onClick={moveToHistoryLogActivity}
              className="p-4 text-white w-3/5 mt-4 bg-blue-950 rounded-xl"
            >
              <div className="flex items-center justify-center">
                <LuFileClock className="mr-3" />
                Histori Log Activity
              </div>
            </button>
            {isQrCodeVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-5 w-max h-max rounded-lg relative">
                  <button
                    onClick={toggleQrCodePopup}
                    className="absolute top-4 right-7 text-gray-500 hover:text-black"
                  >
                    Close
                  </button>
                  <p className="mb-2 mt-4">QR Code</p>
                  {qrCodeUrl ? (
                    <img
                      src={qrCodeUrl}
                      alt="Karyawan QR Code"
                      className="max-w-full max-h-full object-contain mx-auto"
                    />
                  ) : (
                    <div className="flex justify-center items-center">
                      <ClipLoader
                        size={50}
                        color={"#123abc"}
                        loading={loading}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="col-span-2">
            <div className="flex justify-end items-start h-14">
              <button onClick={toggleQrCodePopup} className="text-red-700 mt-4">
                Lihat Barcode Saya
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div className="text-left py-5 px-7 font-extrabold bg-gray-200 flex flex-col justify-center h-28 rounded-lg">
                <div className="grid grid-cols-3 items-center mb-2">
                  <GoDotFill
                    className={`${
                      isIconRed && currentStep > 0
                        ? "text-red-700"
                        : "text-black"
                    }`}
                  />
                  <p className="font-bold col-span-2">Masuk</p>
                </div>
                <p className="font-medium">{currentMasukTime}</p>
              </div>
              <div className="text-left py-5 px-7 font-extrabold bg-gray-200 flex flex-col justify-center h-28 rounded-lg">
                <div className="grid grid-cols-3 items-center mb-2">
                  <GoDotFill
                    className={`${
                      isIconRed && currentStep > 1
                        ? "text-red-700"
                        : "text-black"
                    }`}
                  />
                  <p className="font-bold col-span-2">Istirahat</p>
                </div>
                <p className="font-medium">{currentIstirahatTime}</p>
              </div>
              <div className="text-left py-5 px-7 font-extrabold bg-gray-200 flex flex-col justify-center h-28 rounded-lg">
                <div className="grid grid-cols-3 items-center mb-2">
                  <GoDotFill
                    className={`${
                      isIconRed && currentStep > 2
                        ? "text-red-700"
                        : "text-black"
                    }`}
                  />
                  <p className="font-bold col-span-2">Kembali</p>
                </div>
                <p className="font-medium">{currentKembaliTime}</p>
              </div>

              <div className="text-left py-5 px-7 font-extrabold bg-gray-200 flex flex-col justify-center h-28 rounded-lg">
                <div className="grid grid-cols-3 items-center mb-2">
                  <GoDotFill
                    className={`${
                      isIconRed && currentStep > 3
                        ? "text-red-600"
                        : "text-black"
                    }`}
                  />
                  <p className="font-bold col-span-2">Pulang</p>
                </div>
                <p className="font-medium">{currentPulangTime}</p>
              </div>
            </div>

            <div className="grid items-center gap-0 mt-6">
              <div className="text-red-500 text-center">
                <strong>Attention!</strong>
              </div>

              <div className="gap-6 mt-6">
                {/* <div className="grid grid-cols md:grid-cols-2 gap-6 mt-6"> */}
                {/* <div className="bg-white border border-red-500 p-4 rounded-lg flex items-center justify-center h-40">
                  <div className="text-red-500 text-center">
                    Kemarin anda absen pulang di kost jangan diulang!
                  </div>
                </div> */}

                <div className="bg-white border border-red-500 p-4 rounded-lg flex flex-col items-center">
                  <div className="text-red-500 font-semibold text-center mb-5">
                    Anda memiliki kekurangan jam kerja
                  </div>
                  <div className="text-red-500 text-2xl text-center mt-2">
                    -{formattedTime}
                  </div>
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
