export function addQuery({ uri, query, value }) {
  return `${uri}${uri.includes("?") ? "&" : "?"}${query}=${value}`;
}

export function formatToReadableTime(dateString) {
  const { floor } = Math;
  const now = new Date().getTime();
  const date = new Date(dateString).getTime();
  if (Number.isNaN(date)) return "어떤 오후";
  const diffToSeconds = (now - date) / 1000;
  const oneDayToSeconds = 86400;
  const diffToDay = floor(diffToSeconds / oneDayToSeconds);
  const lessThanDay = diffToSeconds < oneDayToSeconds;

  if (lessThanDay) {
    if (diffToSeconds < 240) return "방금";
    if (diffToSeconds < 3600) return `${floor(diffToSeconds / 60)}분 전`;
    return `${floor(diffToSeconds / 3600)}시간 전`;
  }

  if (diffToDay < 7) return `${diffToDay}일 전`;
  if (diffToDay < 60) return `${floor(diffToDay / 7)}주 전`;
  if (diffToDay < 365) return `${floor(diffToDay / 30.5)}개월 전`;
  return `${floor(diffToDay / 365)}년 전`;
}
