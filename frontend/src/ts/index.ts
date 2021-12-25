import { saveUserOnLogin, loadUser } from "./data/user";
import GlobalNavigation from "./components/GlobalNavigation";
import { initializeRouter } from "./router";
import "../css/reset.css";
import "../css/animations.css";
import "../css/style.css";
import "../css/Header.css";
import "../css/footer.css";
import "../css/icon.css";

saveUserOnLogin();
loadUser();
document.body.prepend(GlobalNavigation());
initializeRouter();

// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}
