import React from "react";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-0">
      <div
        className="text-white w-full p-4 flex justify-between items-center"
        style={{ backgroundImage: URL("assets/background.svg") }}
      >
        <div>
          <div className="text-sm">Rabu, 23 Agustus 2023</div>
          <div className="text-lg font-semibold">
            Change your life now for better future
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-red-600 rounded-full h-10 w-10 flex items-center justify-center text-white mr-2">
            <span className="material-icons">person</span>
          </div>
          <div className="text-sm">
            Syalita Widyandini
            <br />
            RW/UIUX/POLINES/AGST2023/06
          </div>
        </div>
        <div className="text-2xl">09:30:01</div>
      </div>
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-8 mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Shift Middle</h2>
          <button className="bg-blue-900 text-white px-4 py-2 rounded-lg">
            Lihat Barcode Saya
          </button>
        </div>
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
          <div className="mb-2">Sudahkah Anda berbuat kebaikan hari ini?</div>
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
  );
};

export default Homepage;
