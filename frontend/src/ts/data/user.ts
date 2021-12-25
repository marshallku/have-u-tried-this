import parseCookie from "../utils/cookie";

declare global {
  interface Window {
    user: {
      token: string;
      id: string;
      profile: string;
    } | null;
  }
}

export function saveUser() {
  const { token, user } = JSON.parse(parseCookie(document.cookie).user);
  if (!token || !user) return;

  localStorage.setItem("token", token);
  localStorage.setItem("userId", user.id);
  localStorage.setItem("userProfile", user.profile);
}

export function removeUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userProfile");
  window.user = null;
  window.location.reload();
}

export function saveUserOnLogin() {
  if (window.location.search.includes("redirected")) saveUser();
}

export function loadUser() {
  window.user = {
    token: localStorage.getItem("token") || "",
    id: localStorage.getItem("userId") || "",
    profile: localStorage.getItem("userProfile") || "/static/images/person.svg",
  };
}
