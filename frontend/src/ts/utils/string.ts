export function removeLineBreak(string: string) {
  return string.replaceAll("\n", " ");
}

export function removeBackSpace(string: string) {
  return string.replaceAll("\b", "");
}
