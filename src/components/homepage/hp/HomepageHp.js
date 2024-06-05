import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import Header from "./HeaderHp";

// Function Get Current Time
const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const getCurrentDate = () => {
  const now = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return now.toLocaleDateString("id-ID", options);
};

const calculateTimeDifference = (startTime, endTime) => {
  const [startHours, startMinutes, startSeconds] = startTime
    .split(":")
    .map(Number);
  const [endHours, endMinutes, endSeconds] = endTime.split(":").map(Number);

  const startDate = new Date(0, 0, 0, startHours, startMinutes, startSeconds);
  const endDate = new Date(0, 0, 0, endHours, endMinutes, endSeconds);
  let diff = endDate - startDate;

  const hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / 1000 / 60);
  diff -= minutes * 1000 * 60;
  const seconds = Math.floor(diff / 1000);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
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
  const [shortageTime, setShortageTime] = useState("---");

  const standardWorkingHours = "08:00:00"; // 8 hours

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleMasukClick = () => {
    setIsPopupVisible(true);
  };

  const handleConfirm = () => {
    const timeString = getCurrentTime();
    setIsPopupVisible(false);
    setIsIconRed(true);
    switch (currentStep) {
      case 0:
        setCurrentMasukTime(timeString);
        setCurrentStep(1);
        break;
      case 1:
        setCurrentIstirahatTime(timeString);
        setCurrentStep(2);
        break;
      case 2:
        setCurrentKembaliTime(timeString);
        setCurrentStep(3);
        break;
      case 3:
        setCurrentPulangTime(timeString);
        calculateShortageTime(timeString);
        setCurrentStep(0);
        break;
      default:
        break;
    }
  };

  const calculateShortageTime = (currentPulangTime) => {
    if (currentMasukTime !== "---" && currentPulangTime !== "---") {
      const totalWorkingTime = calculateTimeDifference(
        currentMasukTime,
        currentPulangTime
      );
      const [totalHours, totalMinutes, totalSeconds] = totalWorkingTime
        .split(":")
        .map(Number);
      const [standardHours, standardMinutes, standardSeconds] =
        standardWorkingHours.split(":").map(Number);

      const totalInSeconds =
        totalHours * 3600 + totalMinutes * 60 + totalSeconds;
      const standardInSeconds =
        standardHours * 3600 + standardMinutes * 60 + standardSeconds;

      let shortageInSeconds = standardInSeconds - totalInSeconds;
      if (shortageInSeconds < 0) shortageInSeconds = 0;

      const shortageHours = Math.floor(shortageInSeconds / 3600);
      shortageInSeconds -= shortageHours * 3600;
      const shortageMinutes = Math.floor(shortageInSeconds / 60);
      const shortageSeconds = shortageInSeconds % 60;

      setShortageTime(
        `${String(shortageHours).padStart(2, "0")}:${String(
          shortageMinutes
        ).padStart(2, "0")}:${String(shortageSeconds).padStart(2, "0")}`
      );
    }
  };

  let navigate = useNavigate();
  const moveToHistoryLogActivity = () => {
    navigate("/HistoryLogActivity");
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
              <p className="text-start text-red-600 text-sm">- Telat Masuk</p>
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
        <div className="mt-4">
          <p>Sudahkah Anda berbuat kebaikan hari ini?</p>
          <textarea
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Tambahkan kebaikan apa hari ini yang telah anda lakukan"
          ></textarea>
          <div className="flex justify-between mt-2">
            <button className="px-4 py-2 bg-gray-500 text-white rounded-md">
              Batal
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Tambahkan
            </button>
          </div>
        </div>
      </div>
      <div className="w-full px-4 py-6 text-center bg-white">
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
            {shortageTime !== "---" && (
              <div className="text-red-700 text-2xl mt-2">-{shortageTime}</div>
            )}
            <div className="mt-2">
              <button className="text-blue-600">Lihat Detail</button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 py-6 flex justify-between bg-white">
        <button
          onClick={handleMasukClick}
          className="p-4 text-white bg-blue-900 rounded-md w-full"
        >
          Masuk
        </button>
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
        <button
          className="p-4 text-white bg-blue-900 rounded-md mx-2"
          onClick={moveToHistoryLogActivity}
        >
          Log Activity
        </button>
        <button
          onClick={moveToHistoryLogActivity}
          className="p-4 text-white bg-blue-900 rounded-md"
        >
          Histori Log Activity
        </button>
      </div>
    </div>
  );
};

export default Homepage;
