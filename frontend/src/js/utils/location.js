export function addQuery({ uri, param, value }) {
  const url = new URL(uri);
  const searchParams = new URLSearchParams(url.search);

  searchParams.append(param, value);

  url.search = searchParams.toString();

  return url.toString();
}

export function getPaths(index = 1) {
  return window.location.pathname
    .split("/")
    .slice(index)
    .map((x) => decodeURI(x));
}
