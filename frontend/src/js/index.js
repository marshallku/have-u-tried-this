import { initializeRouter } from "./router";
import GlobalNavigation from "./components/GlobalNavigation";
import "../css/reset.css";
import "../css/style.css";
import "../css/footer.css";

document.body.prepend(GlobalNavigation());
initializeRouter();
