// store/AuthStore.ts
import { create } from "zustand";
import { setCookie, getCookie, removeCookie } from "@/lib/cookieHelpers";

interface User {
  email: string;
  username: string;
}

interface Authdata {
  user: User | null;
  token: string | null;
  loading: boolean;
  step: number;
  isLoggedIn: boolean;
  checkAuthStatus: () => void;
  setStep: (step: number) => void;
  setLoading: (loading: boolean) => void;
  setUser: (user: User | null, duration: number) => void;
  setToken: (token: string | null, duration: number) => void;
  logout: () => void;
}

const useAuthStore = create<Authdata>((set) => ({
  user: null,
  token: null,
  loading: false,
  step: 1,
  isLoggedIn: false,

  setStep: (step) => set({ step }),
  setLoading: (loading) => set({ loading }),

  setUser: (user, duration) => {
    if (user) setCookie("user", user, duration);
    else removeCookie("user");
    set({ user, isLoggedIn: !!user });
  },

  setToken: (token, duration) => {
    if (token) setCookie("token", token, duration);
    else removeCookie("token");
    set({ token });
  },

  checkAuthStatus: () => {
    const user = getCookie("user");
    const token = getCookie("token");
    const isLoggedIn = !!user && !!token;
    set({ user, token, isLoggedIn });
  },

  logout: () => {
    removeCookie("user");
    removeCookie("token");
    set({ user: null, token: null, isLoggedIn: false });
  },
}));

export default useAuthStore;
