export default function removeHash() {
  window.history.replaceState(null, "", " ");
}
