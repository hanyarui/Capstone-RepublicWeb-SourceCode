import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import Header from "../components/homepage/Header";

const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const Homepage = () => {
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Pop Up
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState("---");

  const handleMasukClick = () => {
    setIsPopupVisible(true);
  };

  const handleConfirm = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    setCurrentTime(timeString);
    setIsPopupVisible(false);
  };

  // Move to History Log Activity
  let navigate = useNavigate();
  const moveToHistoryLogActivity = () => {
    navigate("/HistoryLogActivity");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-0">
      <Header />
      <div className="w-full px-16 py-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center my-auto">
            <h2 className="text-3xl font-bold mb-4">Shift Middle</h2>
            <button
              className="p-3 text-white w-full mb-4"
              style={{ backgroundColor: "#040F4D", borderRadius: "20px" }}
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
              className="p-3 text-white w-full mb-4"
              style={{ backgroundColor: "#040F4D", borderRadius: "20px" }}
            >
              Log Activity
            </button>
            <button
              className="p-3 text-white w-full"
              style={{ backgroundColor: "#040F4D", borderRadius: "20px" }}
            >
              Histori Log Activity
            </button>
          </div>
          <div className="col-span-2">
            <div className="flex justify-end mb-4">
              <button className="text-red-600">Lihat Barcode Saya</button>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div
                className="text-left py-5 px-8 font-extrabold bg-gray-200 flex items-center justify-start w-full"
                style={{ borderRadius: "10px" }}
              >
                <GoDotFill className="mr-2" />
                <div>
                  <p className="font-bold">Masuk</p>
                  <p>{currentTime}</p>
                </div>
              </div>
              <div
                className="text-left py-5 px-8 font-extrabold bg-gray-200 flex items-center justify-start w-full"
                style={{ borderRadius: "10px" }}
              >
                <GoDotFill className="mr-2" />
                <div>
                  <p className="font-bold">Istirahat</p>
                  <p>---</p>
                </div>
              </div>
              <div
                className="text-left py-5 px-8 font-extrabold bg-gray-200 flex items-center justify-start w-full"
                style={{ borderRadius: "10px" }}
              >
                <GoDotFill className="mr-2" />
                <div>
                  <p className="font-bold">Kembali</p>
                  <p>---</p>
                </div>
              </div>
              <div
                className="text-left py-5 px-8 font-extrabold bg-gray-200 flex items-center justify-start w-full"
                style={{ borderRadius: "10px" }}
              >
                <GoDotFill className="mr-2" />
                <div>
                  <p className="font-bold">Pulang</p>
                  <p>---</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white border border-red-500 p-4 rounded-lg">
                <div className="text-red-700 text-center">
                  <strong>Attention!</strong>
                  <p>• Kemarin anda absen pulang di kost jangan diulang!</p>
                </div>
              </div>
              <div className="bg-white border border-red-500 p-4 rounded-lg">
                <div className="text-red-700 w-semibold text-center mb-2">
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

export default Homepage;
