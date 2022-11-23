String.prototype.toCapitalCase = function () {
  return this.trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
