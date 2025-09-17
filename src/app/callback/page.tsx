"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "@/lib/cookies";
import { useAuthStore } from "@/store/Authstore";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setToken, setAuthStatus } = useAuthStore();

  useEffect(() => {
    const token = searchParams.get("token");
    const user = searchParams.get("user"); 

    if (token) {
      setCookie("token", token, { expires: 3 });
      setToken(token);
      

      if (user) {
        setCookie("user", user, { expires: 3 });
      }

      router.push("/dashboard");
    } else {
      router.push("/"); 
    }
  }, [searchParams, router, setAuthStatus, setToken]);

  return <p className="text-center mt-10">Finishing login...</p>;
}
