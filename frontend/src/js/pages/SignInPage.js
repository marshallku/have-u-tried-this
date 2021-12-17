import { addClickEvent } from "../router";
import "../../css/SignInPage.css";

export default function SignInPage() {
  const container = document.createElement("div");
  const logoWrap = document.createElement("div");
  const logo = document.createElement("img");
  const signInWrap = document.createElement("div");
  const signInTitle = document.createElement("h2");
  const signInInfo = document.createElement("p");
  const signInButton = document.createElement("button");
  const googleIcon = document.createElement("img");
  const signInText = document.createElement("span");

  container.classList.add("sign-in");

  // Logo
  logoWrap.classList.add("sign-in__logo");
  logo.src = "/static/images/logo.svg";
  logoWrap.append(logo);

  // Sign In Container
  // Title
  signInWrap.classList.add("sign-in__container");
  signInTitle.classList.add("sign-in__title");
  signInInfo.classList.add("sign-in__info");
  signInTitle.innerText = "로그인";
  signInInfo.innerText = "구글로 간편하게 로그인 하고 맛식 저장, 공유 하세요!";

  // Button
  signInButton.classList.add("sign-in__button");
  googleIcon.src = "/static/images/google.svg";
  signInText.innerText = "Google 계정으로 로그인";
  signInButton.append(googleIcon, signInText);
  addClickEvent(signInButton, "/user");

  signInWrap.append(signInTitle, signInInfo, signInButton);

  // Append
  container.append(logoWrap, signInWrap);

  return container;
}
