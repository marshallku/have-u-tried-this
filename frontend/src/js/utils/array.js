export function reset(arr) {
  while (arr[0]) {
    arr.pop();
  }
}

export function resetWithSize(arr, size, number) {
  reset(arr);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < size; i++) {
    arr.push(number);
  }
}

export function pick(arr, len, random = false) {
  return arr
    .map((x, i) => ({ x, sort: random ? Math.random() : i }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ x }) => x)
    .filter((_, i) => i < len);
}

export function pickRandom(arr) {
  return arr[~~(Math.random() * arr.length)];
}
