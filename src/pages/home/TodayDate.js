import React from "react";

const TodayDate = () => {
  const today = new Date();
  const formattedDate = formatTanggal(today);

  return (
    <div>
      <p>{formattedDate}</p>
    </div>
  );
};

// Fungsi formatTanggal dipindahkan ke luar komponen agar tidak didefinisikan ulang setiap render
const formatTanggal = (tanggal) => {
  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const day = hari[tanggal.getDay()];
  const date = tanggal.getDate();
  const month = bulan[tanggal.getMonth()];
  const year = tanggal.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

export default TodayDate;
