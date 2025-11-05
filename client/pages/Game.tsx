import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

interface GameConfig {
  emoji: string;
  title: string;
  instruction: string;
  description: string;
  color: string;
  bgColor: string;
}

const gameConfigs: Record<string, GameConfig> = {
  "emotional-recognition": {
    emoji: "🎭",
    title: "Emotional Recognition",
    instruction: "How are you feeling today?",
    description:
      "Learn to identify and understand different emotions and facial expressions.",
    color: "from-rose-200 to-pink-200",
    bgColor: "bg-rose-50",
  },
  "theory-of-mind": {
    emoji: "🧠",
    title: "Theory of Mind",
    instruction: "What are they thinking?",
    description:
      "Develop understanding of how others think and perceive situations.",
    color: "from-blue-200 to-cyan-200",
    bgColor: "bg-blue-50",
  },
  "executive-function": {
    emoji: "📋",
    title: "Executive Function",
    instruction: "Plan your steps",
    description:
      "Practice planning, organizing, and completing multi-step tasks.",
    color: "from-amber-200 to-yellow-200",
    bgColor: "bg-amber-50",
  },
  "social-communication": {
    emoji: "👥",
    title: "Social Communication",
    instruction: "Let's communicate!",
    description:
      "Build social skills and learn reciprocal interaction patterns.",
    color: "from-green-200 to-emerald-200",
    bgColor: "bg-green-50",
  },
};

export default function Game() {
  const { gameId = "emotional-recognition" } = useParams();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const gameConfig = gameConfigs[gameId] || gameConfigs["emotional-recognition"];

  return (
    <div className={`min-h-screen ${gameConfig.bgColor}`}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <Link to="/">
            <button className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors duration-300">
              <ArrowLeft size={20} className="text-slate-700" />
            </button>
          </Link>
          <div className="text-center flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
              <span className="text-4xl">{gameConfig.emoji}</span>
              {gameConfig.title}
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              {gameConfig.description}
            </p>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors duration-300"
          >
            {soundEnabled ? (
              <Volume2 size={20} className="text-slate-700" />
            ) : (
              <VolumeX size={20} className="text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Progress Bar */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">
                Question {currentQuestion} of 5
              </h3>
              <span className="text-sm text-slate-600">
                {currentQuestion === 5
                  ? "🎉 Final question!"
                  : `${(currentQuestion / 5) * 100}% complete`}
              </span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${gameConfig.color} transition-all duration-500`}
                style={{ width: `${(currentQuestion / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Instruction Card */}
          <div
            className={`bg-gradient-to-br ${gameConfig.color} rounded-2xl p-8 shadow-md border-2 border-white`}
          >
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 text-center">
              {gameConfig.instruction}
            </p>
          </div>

          {/* Game Content Area */}
          <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200 min-h-96 flex flex-col items-center justify-center">
            <p className="text-6xl mb-4">🎮</p>
            <p className="text-xl font-semibold text-slate-900 text-center mb-2">
              Interactive Game Content
            </p>
            <p className="text-slate-600 text-center max-w-sm">
              This is a placeholder for the interactive game. Content will be
              loaded based on the module.
            </p>
          </div>

          {/* Game Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="w-full bg-gradient-to-br from-slate-200 to-slate-300 hover:shadow-md transition-all duration-300 rounded-lg py-4 px-6 font-bold text-slate-900 active:scale-95 flex items-center justify-center gap-2">
              <span className="text-2xl">🔁</span>
              Repeat Instructions
            </button>
            <button
              onClick={() => {
                if (currentQuestion < 5) setCurrentQuestion(currentQuestion + 1);
              }}
              className="w-full bg-gradient-to-br from-pastel-green to-green-300 hover:shadow-md transition-all duration-300 rounded-lg py-4 px-6 font-bold text-slate-900 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Next</span>
              <span className="text-2xl">➡️</span>
            </button>
          </div>

          {/* Voice Guidance */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <button className="w-full bg-gradient-to-br from-blue-300 to-blue-400 hover:shadow-md transition-all duration-300 rounded-lg py-4 px-6 font-bold text-slate-900 active:scale-95 flex items-center justify-center gap-3">
              <span className="text-3xl">🎤</span>
              <span>Listen to Voice Guidance</span>
            </button>
            <p className="text-sm text-slate-600 text-center mt-4">
              Clear voice guidance available for accessibility
            </p>
          </div>

          {/* Session Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 text-center">
              <p className="text-sm text-slate-600">Time Elapsed</p>
              <p className="text-2xl font-bold text-slate-900">2:15</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 text-center">
              <p className="text-sm text-slate-600">Accuracy</p>
              <p className="text-2xl font-bold text-slate-900">85%</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 text-center">
              <p className="text-sm text-slate-600">Points</p>
              <p className="text-2xl font-bold text-slate-900">425</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
