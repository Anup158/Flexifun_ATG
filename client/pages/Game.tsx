import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

interface GameConfig {
  emoji: string;
  title: string;
  instruction: string;
  color: string;
}

const gameConfigs: Record<string, GameConfig> = {
  emotions: {
    emoji: "🎭",
    title: "Emotions Game",
    instruction: "How are you feeling today?",
    color: "from-pastel-pink to-pastel-peach",
  },
  puzzle: {
    emoji: "🧩",
    title: "Puzzle & Shapes",
    instruction: "Match the shapes!",
    color: "from-pastel-blue to-pastel-lavender",
  },
  music: {
    emoji: "🎶",
    title: "Music & Movement",
    instruction: "Follow the music!",
    color: "from-pastel-yellow to-pastel-green",
  },
};

export default function Game() {
  const { gameId = "emotions" } = useParams();
  const [soundEnabled, setSoundEnabled] = useState(true);

  const gameConfig = gameConfigs[gameId] || gameConfigs.emotions;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gameConfig.color} overflow-hidden`}>
      {/* Soft animated background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
      <div className="absolute -bottom-32 left-1/4 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: "2s" }}></div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-4 md:p-8">
        <Link to="/">
          <button className="bg-white rounded-full p-3 md:p-4 shadow-lg hover:scale-110 transition-transform duration-300 active:scale-95">
            <ArrowLeft size={28} className="text-gray-700" />
          </button>
        </Link>
        <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg flex items-center gap-3">
          <span className="text-4xl md:text-5xl">{gameConfig.emoji}</span>
          {gameConfig.title}
        </h1>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="bg-white rounded-full p-3 md:p-4 shadow-lg hover:scale-110 transition-transform duration-300 active:scale-95"
        >
          {soundEnabled ? (
            <Volume2 size={28} className="text-gray-700" />
          ) : (
            <VolumeX size={28} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-4 md:px-8 gap-8 md:gap-12">
        {/* Instruction */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg max-w-2xl w-full text-center">
          <p className="text-2xl md:text-4xl font-bold text-gray-800">
            {gameConfig.instruction}
          </p>
        </div>

        {/* Game Area - Placeholder */}
        <div className="bg-white rounded-3xl w-full max-w-4xl aspect-video md:aspect-auto md:h-80 shadow-lg flex items-center justify-center flex-col gap-4">
          <p className="text-5xl md:text-7xl opacity-50">🎮</p>
          <p className="text-xl md:text-2xl text-gray-500">Game Content Here</p>
          <p className="text-sm md:text-base text-gray-400">
            This is a placeholder for the game content
          </p>
        </div>

        {/* Game Controls */}
        <div className="flex gap-4 md:gap-6 flex-wrap justify-center w-full max-w-2xl">
          <button className="bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-2xl p-4 md:p-5 flex items-center gap-3 cursor-pointer active:scale-95 shadow-md">
            <span className="text-3xl md:text-4xl">🔁</span>
            <span className="text-lg md:text-xl font-bold text-gray-700">
              Repeat
            </span>
          </button>
          <button className="bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-2xl p-4 md:p-5 flex items-center gap-3 cursor-pointer active:scale-95 shadow-md">
            <span className="text-lg md:text-xl font-bold text-gray-700">
              Next
            </span>
            <span className="text-3xl md:text-4xl">➡️</span>
          </button>
          <button className="bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-2xl p-4 md:p-5 flex items-center gap-3 cursor-pointer active:scale-95 shadow-md">
            <span className="text-3xl md:text-4xl">🎤</span>
            <span className="text-lg md:text-xl font-bold text-gray-700">
              Voice
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
