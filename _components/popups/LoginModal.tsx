"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import useAuthStore from "@/store/Authstore";
import { setCookie } from "@/lib/cookieHelpers";

export default function LoginModal({open,onClose,}: { open: boolean; onClose: () => void;}) {
  if (!open) return null;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://gidswap-server.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      const token = res.data.token;
      const user = res.data.user;
      toast.success(`${res.data.message}`);

      // Save login token for 3 days (72 hours)
      setCookie("token", token, 72);
      setCookie("user", JSON.stringify(user), 72);

      onClose();
    } catch (err: any) {
      toast.error(`Login failed: ${err.response?.data?.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        onClick={handleLogin}
        disabled={loading || !email || !password}
        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
