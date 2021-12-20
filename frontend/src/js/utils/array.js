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
