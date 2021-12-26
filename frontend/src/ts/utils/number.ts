export function isZero(numberToCheck: number, numberToSet: number): number {
  if (typeof numberToCheck !== "number" || Number.isNaN(numberToCheck))
    return 0;

  return numberToCheck === 0 ? 0 : numberToSet;
}

export function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
