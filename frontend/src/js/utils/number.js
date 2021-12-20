// eslint-disable-next-line import/prefer-default-export
export function isZero(numberToCheck, numberToSet) {
  if (typeof numberToCheck !== "number" || Number.isNaN(numberToCheck))
    return 0;

  return numberToCheck === 0 ? 0 : numberToSet;
}
