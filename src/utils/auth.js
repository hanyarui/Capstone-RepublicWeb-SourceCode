// utils/auth.js
import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get("token"); // asumsikan token disimpan dengan nama 'token'
};
