export const Colors = {
  green: "#3ba16c",
  grey: "#8a8a8a",
  red: "red",
  yellow: "#fac811",
  orange: "#fc8c03",
};

export const optionBulan = [
  "Januari",
  "Pebruari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "Nopember",
  "Desember",
];

export const optionTanggal = [
  "Pilih tanggal",
  ...new Array(31).fill(1).map((_, i) => i + 1),
];

export const optionYear = [...new Array(51).fill(1).map((_, i) => i + 2020)];
