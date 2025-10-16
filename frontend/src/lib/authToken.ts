import Cookies from "js-cookie";

export const setAuthToken = (value: string | null) => {
  if (value) {
    Cookies.set("token", value, { path: "/", sameSite: "Lax" });
  } else {
    Cookies.remove("token");
  }
};

export const getAuthToken = () => {
  return Cookies.get("token") || null;
};