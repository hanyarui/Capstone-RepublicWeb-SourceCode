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
        className="text-white w-full h-1/2 flex justify-between items-center py-10 px-16"
        style={{
          backgroundImage: "url(/assets/background.svg)",
          borderRadius: "0 0 40px 0",
        }}
      >
        <div className="grid w-full gap-12">
          <div className="grid grid-cols-2">
            <div className="text-left flex">
              <FaRegCalendarAlt className="w-7 h-7" />
              <div className="text-xl font-thin ml-3">
                <TodayDate />
              </div>
            </div>
            <div className="text-2xl font-semibold text-right">{time}</div>
          </div>

          <div className="grid grid-cols-1">
            <div className="col-span-3 text-2xl font-bold text-center">
              Change your life now for better future
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="text-left flex bg-black bg-transparent">
              <div
                className=" bg-red-700 w-12 h-12"
                style={{ borderRadius: "100%" }}
              >
                <IoPersonSharp className="w-9 h-9 text-center" />
              </div>
              <div className="ml-3">
                <p className="text-xl">Nama Lengkap</p>
                <p>NIP</p>
              </div>
            </div>
            <div className="text-left flex">
              <IoPersonSharp className="w-9 h-9 items-end" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid w-full gap-16">
        <div className="grid grid-cols-3">
          <div className="my-auto">
            <h2 className="text-xl font-semibold text-center">Shift Middle</h2>
            <div className="items-center">
              <button
                className="p-3 block text-white mx-auto w-3/5 mt-5"
                style={{ backgroundColor: "#040F4D", borderRadius: "20px" }}
              >
                Masuk
              </button>
              <button
                className="p-3 block text-white mx-auto w-3/5 mt-2"
                style={{ backgroundColor: "#040F4D", borderRadius: "20px" }}
              >
                Log Activity
              </button>
              <button
                className="p-3 block text-white mx-auto w-3/5 mt-2"
                style={{ backgroundColor: "#040F4D", borderRadius: "20px" }}
              >
                History Log Activity
              </button>
            </div>
          </div>

          <div className="grid">
            <div className="flex justify-between items-center mb-6">
              <button className="bg-blue-900 text-white px-4 py-2 rounded-lg">
                Lihat Barcode Saya
              </button>
            </div>
            <div className="bg-white w-full rounded-lg shadow-lg p-8 mt-6 col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <button className="bg-blue-900 text-white px-4 py-2 rounded-lg mb-2">
                    Masuk
                  </button>
                  <div className="text-center">---</div>
                </div>
                <div className="flex flex-col items-center">
                  <button className="bg-blue-900 text-white px-4 py-2 rounded-lg mb-2">
                    Istirahat
                  </button>
                  <div className="text-center">---</div>
                </div>
                <div className="flex flex-col items-center">
                  <button className="bg-blue-900 text-white px-4 py-2 rounded-lg mb-2">
                    Kembali
                  </button>
                  <div className="text-center">---</div>
                </div>
                <div className="flex flex-col items-center">
                  <button className="bg-blue-900 text-white px-4 py-2 rounded-lg mb-2">
                    Pulang
                  </button>
                  <div className="text-center">---</div>
                </div>
              </div>
              <div className="mb-6">
                <div className="mb-2">
                  Sudahkah Anda berbuat kebaikan hari ini?
                </div>
                <textarea
                  className="w-full p-2 border rounded-lg"
                  placeholder="Tambahkan kebaikan apa hari ini yang telah anda lakukan"
                />
                <div className="flex justify-end mt-2">
                  <button className="bg-blue-900 text-white px-4 py-2 rounded-lg">
                    Tambahkan
                  </button>
                </div>
              </div>
              <div className="bg-red-100 border border-red-500 p-4 rounded-lg">
                <div className="text-red-700 font-semibold mb-2">
                  Attention!
                </div>
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
    </div>
  );
};

export default Homepage;
