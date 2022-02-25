import Cookies from "js-cookie";

const TokenKey = "token";
const UserId = "userId";
const UserInfo = "userInfo";

function setCookie(key, value) {
  // https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie/SameSite
  Cookies.set("Secure");
  return Cookies.set(key, value);
}

function getCookie(key) {
  return Cookies.get(key);
}

// token
export function getToken() {
  return getCookie(TokenKey);
}

export function setToken(token) {
  return setCookie(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

// 用户信息
export function setUserInfo(info) {
  return setCookie(UserInfo, info);
}

export function getUserInfo() {
  return getCookie(UserInfo);
}

// userId
export function setUserId(userId) {
  return setCookie(UserId, userId);
}

export function getUserId() {
  return getCookie(UserId);
}
