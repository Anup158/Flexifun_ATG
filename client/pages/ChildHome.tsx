import { Link, useNavigate } from "react-router-dom";
import { Volume2, VolumeX, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/services/api";
import { gameModules } from "@/services/gameService";

interface GameProgress {
  moduleId: string;
  accuracy: number;
  completed: number;
  total: number;
}

interface StudentStats {
  student: {
    name: string;
    avatar: string;
    progressStars: number;
    soundEnabled: boolean;
  };
  stats: {
    totalSessions: number;
    totalHours: number;
    currentStreak: number;
    totalPoints: number;
  };
}

export default function ChildHome() {
  const navigate = useNavigate();
  const { user, logout, userType } = useAuth();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [progress, setProgress] = useState<GameProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect if not a student
    if (userType !== "student") {
      navigate("/");
      return;
    }

    fetchData();
  }, [userType, navigate]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [statsData, progressData] = await Promise.all([
        apiClient.getStudentStats(),
        apiClient.getStudentProgress(),
      ]);

      setStats(statsData);
      setProgress(progressData);
      setSoundEnabled(statsData.student.soundEnabled);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getModuleProgress = (moduleId: string) => {
    const mod = progress.find((p) => p.moduleId === moduleId);
    return mod ? (mod.completed / (mod.total || 5)) * 100 : 0;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900">Loading...</p>
        </div>
      </div>
    );
  }

  const studentName = stats?.student.name || user?.name || "Learner";
  const studentAvatar = stats?.student.avatar || user?.avatar || "🦁";
  const progressStars = stats?.student.progressStars || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Welcome to FlexiFun
            </h1>
            <p className="text-sm text-slate-600 mt-1">Learning through play</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                apiClient.updateStudentProfile({ soundEnabled: !soundEnabled });
              }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-pastel-blue hover:bg-blue-300 transition-colors duration-300 shadow-sm"
              aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
            >
              {soundEnabled ? (
                <Volume2 size={20} className="text-slate-700" />
              ) : (
                <VolumeX size={20} className="text-slate-700" />
              )}
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-red-100 hover:bg-red-200 transition-colors duration-300 shadow-sm"
            >
              <LogOut size={20} className="text-red-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* User Greeting */}
        <div className="mb-12">
          <div className="flex items-center gap-4 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="text-5xl">{studentAvatar}</div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {studentName}
              </h2>
              <p className="text-slate-600">
                Keep learning! You're doing great!
              </p>
              <div className="flex gap-2 mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${i < progressStars ? "" : "opacity-30"}`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Game Modules Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Learning Modules
            </h2>
            <p className="text-sm text-slate-600">4 interactive modules</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gameModules.map((game) => {
              const modProgress = getModuleProgress(game.id);
              return (
                <Link key={game.id} to={`/game/${game.id}`}>
                  <div
                    className={`bg-gradient-to-br ${game.color} rounded-2xl p-8 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer h-full border-2 border-white group active:scale-95`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                          {game.emoji}
                        </div>
                        <span className="text-4xl opacity-50">{game.icon}</span>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">
                          {game.title}
                        </h3>
                        <p className="text-slate-700 text-base mt-2">
                          {game.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-4">
                        <div className="flex-1 h-2 bg-white bg-opacity-50 rounded-full">
                          <div
                            className="h-full bg-white rounded-full transition-all duration-300"
                            style={{ width: `${modProgress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-slate-800">
                          {Math.round(modProgress)}%
                        </span>
                      </div>

                      <button className="w-full bg-white hover:bg-slate-50 text-slate-900 font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-center">
                        Start Learning
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
            <p className="text-4xl mb-2">📊</p>
            <p className="text-sm text-slate-600">Total Sessions</p>
            <p className="text-3xl font-bold text-slate-900">
              {stats?.stats.totalSessions || 0}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
            <p className="text-4xl mb-2">⏱️</p>
            <p className="text-sm text-slate-600">Time Spent</p>
            <p className="text-3xl font-bold text-slate-900">
              {Math.round(stats?.stats.totalHours || 0)}h
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
            <p className="text-4xl mb-2">🎯</p>
            <p className="text-sm text-slate-600">Current Streak</p>
            <p className="text-3xl font-bold text-slate-900">
              {stats?.stats.currentStreak || 0} days
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/profile">
              <button className="w-full bg-gradient-to-br from-pastel-blue to-blue-200 hover:shadow-md transition-all duration-300 rounded-lg py-4 px-6 font-semibold text-slate-900 active:scale-95">
                👤 My Profile
              </button>
            </Link>
            <button className="w-full bg-gradient-to-br from-pastel-green to-green-200 hover:shadow-md transition-all duration-300 rounded-lg py-4 px-6 font-semibold text-slate-900 active:scale-95">
              🏆 Achievements
            </button>
            <button className="w-full bg-gradient-to-br from-pastel-yellow to-yellow-200 hover:shadow-md transition-all duration-300 rounded-lg py-4 px-6 font-semibold text-slate-900 active:scale-95">
              📚 Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
