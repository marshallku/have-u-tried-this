export function isZero(numberToCheck, numberToSet) {
  if (typeof numberToCheck !== "number" || Number.isNaN(numberToCheck))
    return 0;

  return numberToCheck === 0 ? 0 : numberToSet;
}

export function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
