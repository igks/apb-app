export const currencyFormat = (value) => {
  return value.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  // return `Rp. ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};
