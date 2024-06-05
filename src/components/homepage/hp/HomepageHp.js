import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { LuFileClock } from "react-icons/lu";
import Header from "./HeaderHp";

// Function Get Current Time
const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

// Function to Get Current Date
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Mock API Call to Save Data
const saveAttendanceData = async (data) => {
  try {
    // Mock API call to save data
    await fetch("/api/saveAttendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error saving attendance data:", error);
  }
};

const Homepage = () => {
  const [time, setTime] = useState(getCurrentTime());
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentMasukTime, setCurrentMasukTime] = useState("---");
  const [currentIstirahatTime, setCurrentIstirahatTime] = useState("---");
  const [currentKembaliTime, setCurrentKembaliTime] = useState("---");
  const [currentPulangTime, setCurrentPulangTime] = useState("---");
  const [currentStep, setCurrentStep] = useState(0);
  const [isIconRed, setIsIconRed] = useState(false);
  const [storedDate, setStoredDate] = useState(getCurrentDate());

  // Time Interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
      checkAndResetProgress();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Check and Reset Progress
  const checkAndResetProgress = async () => {
    const currentDate = getCurrentDate();
    if (currentDate !== storedDate) {
      const attendanceData = {
        date: storedDate,
        masuk: currentMasukTime,
        istirahat: currentIstirahatTime,
        kembali: currentKembaliTime,
        pulang: currentPulangTime,
      };
      await saveAttendanceData(attendanceData);
      resetProgress();
      setStoredDate(currentDate);
    }
  };

  // Reset Progress
  const resetProgress = () => {
    setCurrentMasukTime("---");
    setCurrentIstirahatTime("---");
    setCurrentKembaliTime("---");
    setCurrentPulangTime("---");
    setCurrentStep(0);
    setIsIconRed(false);
  };

  // Button Click Handlers
  const handleButtonClick = () => {
    setIsPopupVisible(true);
  };

  // Pop Up Konfirmasi
  const handleConfirm = () => {
    const timeString = getCurrentTime();
    setIsPopupVisible(false);
    setIsIconRed(true);

    if (currentStep === 0) {
      setCurrentMasukTime(timeString);
    } else if (currentStep === 1) {
      setCurrentIstirahatTime(timeString);
    } else if (currentStep === 2) {
      setCurrentKembaliTime(timeString);
    } else if (currentStep === 3) {
      setCurrentPulangTime(timeString);
    }

    setCurrentStep(currentStep + 1);
  };

  // Pindah Halaman History Log Activity
  let navigate = useNavigate();
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
      <div className="w-full px-4 py-4 flex justify-end items-center bg-white text-black">
        <button className="text-red-600">Lihat Barcode Saya</button>
      </div>
      <div className="w-full px-4 py-6 text-center bg-white">
        <h2 className="text-2xl font-bold mb-4">Shift Middle</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-200 p-1 rounded-md">
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
              <p className="text-start text-red-600 text-sm">-Telat Masuk</p>
            </div>
          </div>
          <div className="bg-gray-200 p-1 rounded-md">
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
          <div className="bg-gray-200 p-1 rounded-md">
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
          <div className="bg-gray-200 p-1 rounded-md">
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
            <div className="text-red-700 text-2xl mt-2">-</div>
            <div className="mt-2">
              <button className="text-blue-600">Lihat Detail</button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 py-6 flex justify-between bg-white">
        {isPopupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg">
              <p>Anda telah masuk</p>
              <button
                onClick={handleConfirm}
                className="mt-3 p-2 bg-blue-500 text-white rounded"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        )}
        <div className="fixed bottom-0 left-0 w-full flex justify-center p-2 bg-white border-t border-gray-300">
          <button
            onClick={handleButtonClick}
            className="p-4 text-white text-xl font-semibold w-1/3"
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
            className="p-2 text-white rounded-md mx-2"
            style={{ backgroundColor: "#040F4D", borderRadius: "20px" }}
            // onClick={moveToLogActivity}
          >
            <RiStickyNoteAddFill className="size-6 mx-8" />
          </button>
          <button
            onClick={moveToHistoryLogActivity}
            className="p-2 text-white rounded-md mx-2"
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
