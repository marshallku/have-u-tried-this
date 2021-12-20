export function addQuery({ uri, param, value }) {
  const url = new URL(uri);
  const searchParams = new URLSearchParams(url.search);

  searchParams.append(param, value);

  url.search = searchParams.toString();

  return url.toString();
}

export function getPaths() {
  return window.location.pathname
    .split("/")
    .slice(1)
    .map((x) => decodeURI(x));
}
