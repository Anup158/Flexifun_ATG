import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { apiClient } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

const avatarOptions = ["🦁", "🐯", "🐻", "🐼", "🐨", "🦊", "🐸", "🦄"];

export default function ChildLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState("🦁");
  const [step, setStep] = useState<"avatar" | "pattern">("avatar");
  const [pattern, setPattern] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const patternDots = Array.from({ length: 9 }, (_, i) => i + 1);

  const handleDotClick = async (dotNumber: number) => {
    const newPattern = [...pattern, dotNumber];
    setPattern(newPattern);

    if (newPattern.length >= 4) {
      setCompleted(true);
      setIsLoading(true);
      setError("");

      try {
        // Convert pattern to PIN (e.g., "1234")
        const pinCode = newPattern.join("");

        const response = await apiClient.studentLogin(pinCode);

        if (response.token && response.student) {
          apiClient.setToken(response.token);
          login(response.student, "student");

          setTimeout(() => {
            navigate("/home");
          }, 500);
        }
      } catch (err) {
        setError("Login failed. Please check your pattern.");
        setCompleted(false);
        setPattern([]);
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setPattern([]);
    setCompleted(false);
    setError("");
  };

  const handleBack = () => {
    if (step === "pattern") {
      setStep("avatar");
      setPattern([]);
      setCompleted(false);
      setError("");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-yellow via-pastel-peach to-pastel-pink overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Back Button */}
      <button
        onClick={handleBack}
        disabled={isLoading}
        className="absolute top-4 left-4 md:top-8 md:left-8 bg-white rounded-full p-3 md:p-4 shadow-lg hover:scale-110 transition-transform duration-300 active:scale-95 z-20 disabled:opacity-50"
      >
        <ArrowLeft size={28} className="text-gray-700" />
      </button>

      {/* Content */}
      <div className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-md">
        {step === "avatar" ? (
          <>
            {/* Avatar Selection */}
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
                Pick Your Avatar
              </h1>
              <p className="text-xl md:text-2xl">🌈</p>
            </div>

            <div className="flex justify-center mb-8">
              <div className="text-8xl md:text-9xl animate-bounce">
                {selectedAvatar}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 w-full bg-white rounded-3xl p-6 md:p-8 shadow-lg">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`text-4xl md:text-5xl p-3 rounded-2xl transition-all duration-300 ${
                    selectedAvatar === avatar
                      ? "bg-pastel-blue scale-110 shadow-lg"
                      : "bg-pastel-green hover:bg-pastel-lavender"
                  } active:scale-95`}
                >
                  {avatar}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep("pattern")}
              className="w-full bg-gradient-to-br from-pastel-blue to-pastel-lavender hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-3xl p-6 md:p-8 text-2xl md:text-3xl font-bold text-white cursor-pointer active:scale-95 shadow-lg"
            >
              Continue
            </button>
          </>
        ) : (
          <>
            {/* Pattern Login */}
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
                Draw Your Pattern
              </h1>
              <p className="text-lg md:text-xl text-white">
                {completed && !isLoading
                  ? "Great job! Welcome back! 🎉"
                  : isLoading
                    ? "Logging you in..."
                    : `Click ${4 - pattern.length} more dots`}
              </p>
              {error && (
                <p className="text-red-300 mt-2 font-semibold">{error}</p>
              )}
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg w-full">
              <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
                {patternDots.map((dot) => {
                  const isSelected = pattern.includes(dot);
                  return (
                    <button
                      key={dot}
                      onClick={() =>
                        !completed && !isLoading && handleDotClick(dot)
                      }
                      disabled={completed || pattern.length >= 4 || isLoading}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-full text-2xl md:text-3xl font-bold transition-all duration-300 ${
                        isSelected
                          ? "bg-pastel-blue text-white scale-110 shadow-lg"
                          : "bg-pastel-green hover:bg-pastel-yellow"
                      } cursor-pointer active:scale-95 disabled:opacity-50`}
                    >
                      {isSelected ? pattern.indexOf(dot) + 1 : dot}
                    </button>
                  );
                })}
              </div>

              {pattern.length > 0 && (
                <div className="flex gap-3">
                  <button
                    onClick={handleReset}
                    disabled={completed || isLoading}
                    className="flex-1 bg-pastel-pink hover:bg-pastel-peach disabled:opacity-50 transition-colors duration-300 rounded-2xl p-3 font-bold text-gray-700 cursor-pointer active:scale-95"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setStep("avatar")}
                    disabled={completed || isLoading}
                    className="flex-1 bg-pastel-yellow hover:bg-pastel-lavender disabled:opacity-50 transition-colors duration-300 rounded-2xl p-3 font-bold text-gray-700 cursor-pointer active:scale-95"
                  >
                    Back
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
