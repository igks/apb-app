export const currencyFormat = (value) => {
  return value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  // return `Rp. ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};
