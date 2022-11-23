export default function numberSeperator(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
