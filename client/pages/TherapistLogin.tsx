import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function TherapistLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
    } else {
      navigate("/therapist-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-green to-pastel-lavender overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Back Button */}
      <Link to="/">
        <button className="absolute top-4 left-4 md:top-8 md:left-8 bg-white rounded-full p-3 md:p-4 shadow-lg hover:scale-110 transition-transform duration-300 active:scale-95 z-20">
          <ArrowLeft size={28} className="text-gray-700" />
        </button>
      </Link>

      {/* Content */}
      <div className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-md">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
            Therapist Login
          </h1>
          <p className="text-2xl">👩‍⚕️</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white rounded-3xl p-8 md:p-10 shadow-lg space-y-6"
        >
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-bold text-lg mb-3">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-pastel-blue rounded-2xl p-4 md:p-5 text-lg focus:outline-none focus:ring-2 focus:ring-pastel-lavender placeholder-gray-500 placeholder-opacity-50"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-bold text-lg mb-3">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-pastel-blue rounded-2xl p-4 md:p-5 text-lg focus:outline-none focus:ring-2 focus:ring-pastel-lavender placeholder-gray-500 placeholder-opacity-50"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-br from-pastel-green to-pastel-blue hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-2xl p-4 md:p-5 text-xl md:text-2xl font-bold text-white cursor-pointer active:scale-95"
          >
            Login
          </button>
        </form>

        {/* Forgot Password Link */}
        <button className="text-white font-semibold hover:underline text-lg">
          Forgot your password?
        </button>

        {/* Sign Up Link */}
        <p className="text-white text-center text-lg">
          Don't have an account?{" "}
          <button className="font-bold underline hover:no-underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
