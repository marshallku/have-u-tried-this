export function reset(arr: Array<any>): void {
  while (arr[0]) {
    arr.pop();
  }
}

export function resetWithSize(
  arr: Array<any>,
  size: number,
  number: number,
): void {
  reset(arr);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < size; i++) {
    arr.push(number);
  }
}

export function pick<T>(arr: Array<T>, len: number, random = false): Array<T> {
  return arr
    .map((x, i) => ({ x, sort: random ? Math.random() : i }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ x }) => x)
    .filter((_, i) => i < len);
}

export function pickRandom<T>(arr: Array<T>): T {
  return arr[~~(Math.random() * arr.length)];
}
