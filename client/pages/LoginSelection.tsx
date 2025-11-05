import { Link } from "react-router-dom";
import { Cloud, Balloon } from "lucide-react";

interface FloatingAsset {
  id: number;
  left: string;
  delay: string;
  duration: string;
  top: string;
}

const cloudAssets: FloatingAsset[] = [
  { id: 1, left: "10%", delay: "0s", duration: "20s", top: "20%" },
  { id: 2, left: "80%", delay: "5s", duration: "25s", top: "30%" },
  { id: 3, left: "50%", delay: "10s", duration: "30s", top: "10%" },
];

const balloonAssets: FloatingAsset[] = [
  { id: 1, left: "15%", delay: "0s", duration: "15s", top: "80%" },
  { id: 2, left: "75%", delay: "3s", duration: "18s", top: "70%" },
  { id: 3, left: "40%", delay: "6s", duration: "20s", top: "75%" },
  { id: 4, left: "85%", delay: "9s", duration: "22s", top: "65%" },
];

export default function LoginSelection() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-pastel-blue to-pastel-lavender flex flex-col items-center justify-center p-4 md:p-8">
      {/* Animated Background Elements - Clouds */}
      {cloudAssets.map((cloud) => (
        <div
          key={`cloud-${cloud.id}`}
          className="absolute opacity-60 pointer-events-none"
          style={{
            left: cloud.left,
            top: cloud.top,
            animation: `float ${cloud.duration} ease-in-out infinite`,
            animationDelay: cloud.delay,
          }}
        >
          <Cloud size={80} className="text-white drop-shadow-md" />
        </div>
      ))}

      {/* Animated Background Elements - Balloons */}
      {balloonAssets.map((balloon) => (
        <div
          key={`balloon-${balloon.id}`}
          className="absolute pointer-events-none"
          style={{
            left: balloon.left,
            animation: `float ${balloon.duration} ease-in-out infinite`,
            animationDelay: balloon.delay,
          }}
        >
          <div className="flex flex-col items-center">
            <Balloon size={40} className="text-pastel-pink drop-shadow-md" />
            <div
              className="w-1 h-8 md:h-12 opacity-30"
              style={{ background: "rgb(251, 191, 210)" }}
            ></div>
          </div>
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-12 w-full max-w-2xl">
        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
            Who is Logging In?
          </h1>
          <p className="text-3xl md:text-4xl">🌟</p>
        </div>

        {/* Login Options */}
        <div className="flex flex-col gap-6 w-full items-center px-4 sm:px-8">
          {/* Child/Learner Button */}
          <Link
            to="/child-login"
            className="w-full max-w-xs"
          >
            <button className="w-full bg-gradient-to-br from-pastel-yellow to-pastel-peach hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center gap-4 cursor-pointer group">
              <div className="text-5xl md:text-6xl group-hover:scale-110 transition-transform duration-300">
                🧒
              </div>
              <span className="text-2xl md:text-3xl font-bold text-gray-700">
                Child / Learner Login
              </span>
            </button>
          </Link>

          {/* Therapist/Teacher Button */}
          <Link
            to="/therapist-login"
            className="w-full max-w-xs"
          >
            <button className="w-full bg-gradient-to-br from-pastel-green to-pastel-lavender hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center gap-4 cursor-pointer group">
              <div className="text-5xl md:text-6xl group-hover:scale-110 transition-transform duration-300">
                👩‍⚕️
              </div>
              <span className="text-2xl md:text-3xl font-bold text-gray-700">
                Therapist / Teacher Login
              </span>
            </button>
          </Link>
        </div>

        {/* Decorative Stars */}
        <div className="flex gap-2 text-4xl md:text-5xl justify-center pt-4 md:pt-8">
          <span className="animate-pulse-slow">⭐</span>
          <span className="animate-pulse-slow" style={{ animationDelay: "1s" }}>
            ✨
          </span>
          <span className="animate-pulse-slow" style={{ animationDelay: "2s" }}>
            ⭐
          </span>
        </div>
      </div>
    </div>
  );
}
