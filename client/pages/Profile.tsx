import { Link } from "react-router-dom";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

const avatarOptions = ["🦁", "🐯", "🐻", "🐼", "🐨", "🦊", "🐸", "🦄"];

export default function Profile() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState("🦁");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <Link to="/">
            <button className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors duration-300">
              <ArrowLeft size={20} className="text-slate-700" />
            </button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            My Profile
          </h1>
          <div className="w-12"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Avatar Selection */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Choose Your Avatar
            </h2>

            <div className="flex justify-center mb-8 p-8 bg-gradient-to-br from-pastel-blue to-pastel-lavender rounded-xl">
              <div className="text-9xl animate-bounce">{selectedAvatar}</div>
            </div>

            <div className="grid grid-cols-4 gap-3 bg-slate-50 p-6 rounded-xl">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`text-5xl p-4 rounded-lg transition-all duration-300 ${
                    selectedAvatar === avatar
                      ? "bg-pastel-blue scale-110 shadow-lg ring-2 ring-blue-400"
                      : "bg-white hover:bg-slate-100 border border-slate-200"
                  } active:scale-95`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Information */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Profile Information
            </h2>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value="Learner Name"
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 font-semibold cursor-not-allowed"
                />
              </div>

              {/* Progress */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Your Progress
                </label>
                <div className="flex gap-2 text-3xl">
                  {[1, 2, 3].map((i) => (
                    <span key={i} className="text-4xl">
                      ⭐
                    </span>
                  ))}
                  {[1, 2].map((i) => (
                    <span key={`empty-${i}`} className="text-4xl opacity-20">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-sm text-slate-600 mt-2">3 out of 5 stars</p>
              </div>

              {/* Sound Settings */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Sound Settings
                </label>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-300 ${
                    soundEnabled
                      ? "bg-pastel-blue border-blue-400"
                      : "bg-slate-100 border-slate-300"
                  }`}
                >
                  <span className="font-bold text-slate-900">
                    Sound: {soundEnabled ? "ON" : "OFF"}
                  </span>
                  {soundEnabled ? (
                    <Volume2 size={24} className="text-slate-900" />
                  ) : (
                    <VolumeX size={24} className="text-slate-900" />
                  )}
                </button>
              </div>

              {/* Stats */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Your Statistics
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-pastel-blue to-blue-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-slate-700">Sessions</p>
                    <p className="text-3xl font-bold text-slate-900">24</p>
                  </div>
                  <div className="bg-gradient-to-br from-pastel-green to-green-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-slate-700">Hours</p>
                    <p className="text-3xl font-bold text-slate-900">4.5</p>
                  </div>
                  <div className="bg-gradient-to-br from-pastel-yellow to-yellow-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-slate-700">Points</p>
                    <p className="text-3xl font-bold text-slate-900">850</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <Link to="/">
            <button className="w-full bg-gradient-to-br from-pastel-lavender to-lavender-300 hover:shadow-md transition-all duration-300 rounded-lg py-4 px-6 font-bold text-slate-900 active:scale-95 text-lg">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
