import Cookies from "js-cookie";

export const setCookie = (key: string, value: any, expiresInHours: number) => {
  Cookies.set(key, JSON.stringify(value), {
    expires: expiresInHours / 24, 
    secure: true,
    sameSite: "Strict",
  });
};

export const getCookie = (key: string) => {
  const val = Cookies.get(key);
  return val ? JSON.parse(val) : null;
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
