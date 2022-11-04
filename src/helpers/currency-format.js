export const currencyFormat = (value) => {
  return `Rp. ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};
