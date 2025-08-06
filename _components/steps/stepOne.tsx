'use client';

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function StepOne({ data, onNext, onChange }: any) {
  const [errors, setErrors] = useState({ fullName: "", email: "" });
  const [sending, setSending] = useState(false);

  const validate = () => {
    const errs = {
      fullName: data.fullName ? "" : "Full name is required",
      email: /\S+@\S+\.\S+/.test(data.email) ? "" : "Valid email is required",
    };
    setErrors(errs);
    return !errs.fullName && !errs.email;
  };

  const handleNext = async () => {
    if (!validate()) return;

    try {
      setSending(true);

      const res = await axios.post('/api/send-otp', {
        email: data.email,
      });

      if (res.data.success) {
        onNext(); 
      } else {
        // toast.error("Otp send failed")
        throw new Error(res.data.error || "OTP send failed");
        
      }
    } catch (err: any) {
      toast.error(`Failed to send otp: ${err}`)
      console.error("Failed to send OTP:", err);
      // alert(err.response?.data?.error || "Failed to send OTP. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <h1 className="text-[1.2rem] font-semibold text-center py-5">Sigin to <span className="font-crimson italic text-[1.8rem]">Gidswap</span></h1>
      <h2 className="text-lg font-bold mb-4">Your Info</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={data.fullName}
        onChange={(e) => onChange({ fullName: e.target.value })}
        className="w-full mb-2 p-2 border rounded outline focus-visible:outline-blue-700/90"
      />
      {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

      <input
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={(e) => onChange({ email: e.target.value })}
        className="w-full mb-2 p-2 border rounded outline focus-visible:outline-blue-700/90"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <button
        onClick={handleNext}
        disabled={sending}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded disabled:opacity-50"
      >
        {sending ? "Sending OTP..." : "Next"}
      </button>
    </div>
  );
}
