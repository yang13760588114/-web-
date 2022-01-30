import Cookies from "js-cookie";

const TokenKey = "token";
const UserId = "userId";
const userInfo = "userInfo";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

// 设置用户信息
export function setUserInfo(info) {
  return Cookies.set(userInfo, info);
}

export function setUserId(userId) {
  return Cookies.set(UserId, userId);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
