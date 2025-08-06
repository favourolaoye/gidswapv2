"use client";

import { useState } from "react";
import ResuablePop from "./resuablepop";
import StepOne from "../steps/stepOne";
import StepTwo from "../steps/stepTwo";
import StepThree from "../steps/stepThree";
import StepFour from "../steps/stepFour";
import useAuthStore from "@/store/Authstore";

export default function RegisterModal({ open, onClose, onComplete }: { open: boolean; onClose: () => void; onComplete: () => void }) {
  const step = useAuthStore((state) => state.step)
  const setStep = useAuthStore((state) => state.setStep)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    code: "",
  });

  const nextStep = () => setStep((step ?? 1) + 1);
  const prevStep = () => setStep((step ?? 1) - 1);

  const handleDataChange = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSuccess = () => {
    onComplete();
    onClose();
    setStep(1); 
  };

  return (
    <ResuablePop open={open} onClose={onClose}>
      {step === 1 && <StepOne data={formData} onNext={nextStep} onChange={handleDataChange} />}
      {step === 2 && <StepTwo data={formData} onNext={nextStep} onBack={prevStep} onChange={handleDataChange} />}
      {step === 3 && <StepThree data={formData} onNext={nextStep} onBack={prevStep} onChange={handleDataChange} />}
      {step === 4 && <StepFour onFinish={handleSuccess} />}
    </ResuablePop>
  );
}
