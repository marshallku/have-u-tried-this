export default function filterEmptyString(...strings: string[]) {
  const hasEmptyString = strings.some((string) => string === "");
  if (hasEmptyString) {
    throw new Error("빈 문자열이 포함되어 있습니다.");
  }
}
