import { CheckCircle } from "lucide-react";

export default function StepFour({ onFinish }: { onFinish: () => void }) {
  return (
    <div className="text-center">
      <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-2" />
      <h2 className="text-xl font-bold mb-2">Registration Successful!</h2>
      <p className="text-sm mb-4 text-gray-500">You're all set. Welcome aboard.</p>
      <button onClick={onFinish} className="w-full bg-green-600 text-white py-2 rounded">
        Go to Dashboard
      </button>
    </div>
  );
}
