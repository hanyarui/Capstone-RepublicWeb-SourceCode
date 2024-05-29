import { React, useState, useEffect } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import TodayDate from "./home/TodayDate";

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

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-0">
      <div
        className="text-white w-full flex justify-between items-center py-5 px-16"
        style={{
          backgroundImage: "url(/assets/background.svg)",
          borderRadius: "0 0 40px 0",
        }}
      >
        <div className="grid w-full gap-4">
          <div className="grid grid-cols-2">
            <div className="text-left flex items-center">
              <FaRegCalendarAlt className="w-7 h-7" />
              <div className="text-xl font-thin ml-3">
                <TodayDate />
              </div>
            </div>
            <div className="text-2xl font-semibold text-right">{time}</div>
          </div>
          <div className="text-center text-2xl font-bold">
            "Change your life now for better future"
          </div>
          <div className="flex items-center">
            <div className="bg-red-700 w-12 h-12 rounded-full flex justify-center items-center">
              <IoPersonSharp className="w-9 h-9" />
            </div>
            <div className="ml-3">
              <p className="text-xl font-semibold">Syalita Widyandini</p>
              <p>19850910 202112 1 001</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-16 py-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Shift Middle</h2>
            <button
              className="p-3 text-white w-full mb-4"
              style={{ backgroundColor: "#040F4D", borderRadius: "20px" }}
            >
              Masuk
            </button>
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
              <div className="text-center">
                <div>Masuk</div>
                <div>---</div>
              </div>
              <div className="text-center">
                <div>Istirahat</div>
                <div>---</div>
              </div>
              <div className="text-center">
                <div>Kembali</div>
                <div>---</div>
              </div>
              <div className="text-center">
                <div>Pulang</div>
                <div>---</div>
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
