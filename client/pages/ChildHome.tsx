import { Link } from "react-router-dom";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

export default function ChildHome() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const games = [
    {
      id: "emotions",
      emoji: "🎭",
      title: "Emotions Game",
      color: "from-pastel-pink to-pastel-peach",
    },
    {
      id: "puzzle",
      emoji: "🧩",
      title: "Puzzle & Shapes",
      color: "from-pastel-blue to-pastel-lavender",
    },
    {
      id: "music",
      emoji: "🎶",
      title: "Music & Movement",
      color: "from-pastel-yellow to-pastel-green",
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-pastel-blue via-pastel-yellow to-pastel-green overflow-hidden">
      {/* Soft animated background circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pastel-lavender rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute -bottom-32 left-1/4 w-80 h-80 bg-pastel-pink rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="absolute bottom-32 right-1/4 w-72 h-72 bg-pastel-peach rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "4s" }}></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between p-4 md:p-8">
        {/* Header with Sound Control */}
        <div className="w-full flex justify-between items-start pt-4 md:pt-8">
          <div></div>
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
              Welcome to FlexiFun
            </h1>
            <p className="text-4xl mt-2 drop-shadow-md">🌈</p>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="bg-white rounded-full p-3 md:p-4 shadow-lg hover:scale-110 transition-transform duration-300 active:scale-95"
            aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
          >
            {soundEnabled ? (
              <Volume2 size={28} className="text-pastel-blue" />
            ) : (
              <VolumeX size={28} className="text-pastel-lavender" />
            )}
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-3xl flex-1 justify-center">
          {/* Start Learning Button */}
          <Link to="/game/emotions" className="w-full max-w-sm">
            <button className="w-full bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-3xl p-8 md:p-10 flex flex-col items-center justify-center gap-3 cursor-pointer group shadow-lg">
              <div className="text-5xl md:text-6xl group-hover:scale-110 transition-transform duration-300">
                ▶️
              </div>
              <span className="text-3xl md:text-4xl font-bold text-gray-700">
                Start Learning
              </span>
            </button>
          </Link>

          {/* Game Category Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full px-2 md:px-0">
            {games.map((game) => (
              <Link key={game.id} to={`/game/${game.id}`} className="w-full">
                <button className={`w-full bg-gradient-to-br ${game.color} hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center gap-3 cursor-pointer group shadow-lg active:scale-95`}>
                  <div className="text-5xl md:text-6xl group-hover:scale-110 transition-transform duration-300">
                    {game.emoji}
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-gray-700 text-center">
                    {game.title}
                  </span>
                </button>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex gap-4 md:gap-6 pb-4 md:pb-8">
          <Link to="/profile">
            <button className="bg-white hover:shadow-lg hover:scale-110 transition-all duration-300 rounded-2xl p-4 md:p-5 text-3xl md:text-4xl cursor-pointer active:scale-95">
              👤
            </button>
          </Link>
          <button className="bg-white hover:shadow-lg hover:scale-110 transition-all duration-300 rounded-2xl p-4 md:p-5 text-3xl md:text-4xl cursor-pointer active:scale-95">
            🎓
          </button>
          <button className="bg-white hover:shadow-lg hover:scale-110 transition-all duration-300 rounded-2xl p-4 md:p-5 text-3xl md:text-4xl cursor-pointer active:scale-95">
            ⚙️
          </button>
        </div>
      </div>
    </div>
  );
}
