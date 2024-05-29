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
            <h2 className="text-xl font-semibold mb-4">Shift Middle</h2>
            <button
              onClick={handleMasukClick}
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
              onClick={moveToHistoryLogActivity}
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
                className="text-left py-5 pl-8 font-extrabold bg-gray-200 flex items-center"
                style={{ borderRadius: "10px" }}
              >
                <GoDotFill className="mr-2" />
                <div>
                  <p>Masuk</p>
                  <p>{currentTime}</p>
                </div>
              </div>
              <div
                className="text-left py-5 pl-8 font-extrabold bg-gray-200 flex items-center"
                style={{ borderRadius: "10px" }}
              >
                <GoDotFill className="mr-2" />
                <div>
                  <p>Istirahat</p>
                  <p>---</p>
                </div>
              </div>
              <div
                className="text-left py-5 pl-8 font-extrabold bg-gray-200 flex items-center"
                style={{ borderRadius: "10px" }}
              >
                <GoDotFill className="mr-2" />
                <div>
                  <p>Kembali</p>
                  <p>---</p>
                </div>
              </div>
              <div
                className="text-left py-5 pl-8 font-extrabold bg-gray-200 flex items-center"
                style={{ borderRadius: "10px" }}
              >
                <GoDotFill className="mr-2" />
                <div>
                  <p>Pulang</p>
                  <p>---</p>
                </div>
              </div>
            </div>
            <div className="bg-red-100 border border-red-500 p-4 rounded-lg">
              <div className="text-red-700 font-semibold mb-2">Attention!</div>
              <div className="mb-2">
                • Kemarin anda absen pulang di kost jangan diulang!
              </div>
              <div className="text-red-700 font-semibold">
                Anda memiliki kekurangan jam kerja
              </div>
              <div className="text-red-700 text-2xl mt-2">-14:01:53</div>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2">
                Lihat Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
