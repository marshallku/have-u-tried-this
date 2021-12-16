import { addClickEvent } from "../router";
import "../../css/SignInPage.css";

export default function SignInPage() {
  const div = document.createElement("div");
  const logoWrap = document.createElement("div");
  const logo = document.createElement("img");
  const signInButton = document.createElement("button");
  const googleIcon = document.createElement("img");
  const signInText = document.createElement("span");

  div.classList.add("sign-in");

  // Logo
  logoWrap.classList.add("sign-in__logo");
  logo.src = "/static/images/logo.svg";
  logoWrap.append(logo);

  // Button
  signInButton.classList.add("sign-in__button");
  googleIcon.src = "/static/images/google.svg";
  signInText.innerText = "Google 계정으로 로그인";
  signInButton.append(googleIcon, signInText);
  addClickEvent(signInButton, "/user");

  // Append
  div.append(logoWrap, signInButton);

  return div;
}
