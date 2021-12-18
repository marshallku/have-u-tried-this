export function addQuery({ uri, query, value }) {
  return `${uri}${uri.includes("?") ? "&" : "?"}${query}=${value}`;
}
