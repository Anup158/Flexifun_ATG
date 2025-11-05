import { Link } from "react-router-dom";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

const avatarOptions = [
  "🦁",
  "🐯",
  "🐻",
  "🐼",
  "🐨",
  "🦊",
  "🐸",
  "🦄",
];

export default function Profile() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState("🦁");

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-lavender via-pastel-pink to-pastel-peach overflow-hidden">
      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-4 md:p-8">
        <Link to="/">
          <button className="bg-white rounded-full p-3 md:p-4 shadow-lg hover:scale-110 transition-transform duration-300 active:scale-95">
            <ArrowLeft size={28} className="text-pastel-lavender" />
          </button>
        </Link>
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
          My Profile
        </h1>
        <div className="w-12 h-12 md:w-16 md:h-16"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-12 px-4 md:px-8 py-8 md:py-12">
        {/* Avatar Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg w-full max-w-md">
          <p className="text-center text-gray-600 mb-6 text-lg md:text-xl">
            Choose your avatar:
          </p>
          <div className="flex justify-center mb-8">
            <div className="text-8xl md:text-9xl animate-bounce">
              {selectedAvatar}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {avatarOptions.map((avatar) => (
              <button
                key={avatar}
                onClick={() => setSelectedAvatar(avatar)}
                className={`text-4xl md:text-5xl p-3 rounded-2xl transition-all duration-300 ${
                  selectedAvatar === avatar
                    ? "bg-pastel-blue scale-110 shadow-lg"
                    : "bg-pastel-yellow hover:bg-pastel-green"
                } active:scale-95`}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>

        {/* Child Name & Stats */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg w-full max-w-md">
          <p className="text-gray-600 mb-4 text-lg">Name:</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            Learner Name
          </p>

          <p className="text-gray-600 mb-4 text-lg">Progress Stars:</p>
          <div className="flex gap-3 text-4xl md:text-5xl mb-8">
            <span>⭐</span>
            <span>⭐</span>
            <span>⭐</span>
            <span className="opacity-30">⭐</span>
            <span className="opacity-30">⭐</span>
          </div>

          {/* Sound Toggle */}
          <p className="text-gray-600 mb-4 text-lg">Sound:</p>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-full flex items-center justify-between bg-pastel-blue hover:bg-pastel-lavender transition-colors duration-300 rounded-2xl p-4 md:p-5"
          >
            <span className="text-xl md:text-2xl font-semibold text-gray-700">
              {soundEnabled ? "On" : "Off"}
            </span>
            {soundEnabled ? (
              <Volume2 size={28} className="text-gray-700" />
            ) : (
              <VolumeX size={28} className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Back Button */}
        <Link to="/" className="w-full max-w-md">
          <button className="w-full bg-gradient-to-br from-pastel-yellow to-pastel-peach hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-3xl p-6 md:p-8 cursor-pointer active:scale-95 text-2xl md:text-3xl font-bold text-gray-700">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
