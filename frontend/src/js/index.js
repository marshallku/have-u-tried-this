import { initializeRouter } from "./router";
import GlobalNavigation from "./components/GlobalNavigation";
import { saveUserOnLogin, loadUser } from "./data/user";
import "../css/reset.css";
import "../css/style.css";
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
