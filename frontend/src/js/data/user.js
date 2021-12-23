import parseCookie from "../utils/cookie";

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
}

export function saveUserOnLogin() {
  if (window.location.search.includes("redirected")) saveUser();
}

export function loadUser() {
  window.user = {
    token: localStorage.getItem("token"),
    id: localStorage.getItem("userId"),
    profile:
      localStorage.getItem("userProfile") ||
      "/static/images/default_profile.png",
  };
}
