import { Link, useNavigate } from "react-router-dom";
import { LogOut, Download, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/services/api";

interface StudentProgress {
  id: string;
  name: string;
  avatar: string;
  sessionsCompleted: number;
  avgAccuracy: string;
  progressPercentage: number;
}

interface RecentSession {
  id: string;
  studentName: string;
  studentAvatar: string;
  moduleId: string;
  duration: number;
  accuracy: number;
  createdAt: string;
}

interface DashboardData {
  therapist: {
    id: string;
    name: string;
    email: string;
  };
  studentProgress: StudentProgress[];
  recentSessions: RecentSession[];
}

export default function TherapistDashboard() {
  const navigate = useNavigate();
  const { logout, userType } = useAuth();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userType !== "therapist") {
      navigate("/");
      return;
    }

    fetchDashboard();
  }, [userType, navigate]);

  const fetchDashboard = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.getTherapistDashboard();
      setDashboard(data);
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const skills = [
    { name: "Communication", emoji: "💬" },
    { name: "Focus & Attention", emoji: "👀" },
    { name: "Motor Skills", emoji: "✋" },
    { name: "Social Interaction", emoji: "👥" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-blue via-pastel-lavender to-pastel-pink">
      {/* Header */}
      <div className="bg-white shadow-lg p-4 md:p-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            Therapist Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Welcome back, {dashboard?.therapist.name}! 👩‍⚕️</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-pastel-pink hover:bg-pastel-peach transition-colors duration-300 rounded-2xl p-4 md:p-5 flex items-center gap-2 cursor-pointer active:scale-95 shadow-lg"
        >
          <LogOut size={24} className="text-gray-700" />
          <span className="font-bold text-gray-700 hidden md:inline">
            Logout
          </span>
        </button>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
        {/* Progress Tracking Section */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            📊 Student Progress
          </h2>

          {dashboard?.studentProgress && dashboard.studentProgress.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboard.studentProgress.map((student) => (
                <div
                  key={student.id}
                  className="bg-gradient-to-br from-pastel-yellow to-pastel-peach rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl">{student.avatar}</div>
                    <div>
                      <p className="font-bold text-lg text-gray-800">
                        {student.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Sessions: {student.sessionsCompleted}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-pastel-blue to-pastel-lavender h-4 rounded-full transition-all duration-500"
                      style={{ width: `${student.progressPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-sm font-semibold text-gray-700 mt-2">
                    {Math.round(student.progressPercentage)}% Complete
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              <p>No students assigned yet.</p>
            </div>
          )}
        </div>

        {/* Skills Progress */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            🎯 Skills Progress Categories
          </h2>

          <div className="space-y-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="p-6 bg-gradient-to-r from-pastel-blue to-pastel-green rounded-2xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-3">
                    <span className="text-3xl">{skill.emoji}</span>
                    <span className="text-lg md:text-xl font-bold text-gray-800">
                      {skill.name}
                    </span>
                  </span>
                  <span className="text-lg font-bold text-gray-700">
                    {Math.round(
                      (dashboard?.studentProgress.reduce(
                        (sum, s) => sum + parseFloat(s.avgAccuracy || "0"),
                        0
                      ) || 0) / (dashboard?.studentProgress.length || 1)
                    )}%
                  </span>
                </div>
                <div className="w-full bg-white bg-opacity-50 rounded-full h-3">
                  <div
                    className="bg-white h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        (dashboard?.studentProgress.reduce(
                          (sum, s) => sum + parseFloat(s.avgAccuracy || "0"),
                          0
                        ) || 0) / (dashboard?.studentProgress.length || 1)
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Session History & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Session History */}
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              📅 Recent Sessions
            </h2>
            <div className="space-y-4">
              {dashboard?.recentSessions && dashboard.recentSessions.length > 0 ? (
                dashboard.recentSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 bg-pastel-lavender rounded-xl hover:bg-pastel-pink transition-colors duration-300"
                  >
                    <p className="font-bold text-gray-800">
                      {session.studentAvatar} {session.studentName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Module: {session.moduleId.replace(/-/g, " ")}
                    </p>
                    <p className="text-sm text-gray-600">
                      Duration: {Math.round(session.duration)} min | Accuracy: {session.accuracy}%
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(session.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 py-4">No sessions yet</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg flex flex-col gap-6">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
              ⚡ Quick Actions
            </h2>

            <button className="bg-gradient-to-br from-pastel-yellow to-pastel-peach hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-2xl p-6 flex items-center gap-4 cursor-pointer active:scale-95">
              <Plus size={32} className="text-gray-700" />
              <span className="text-lg font-bold text-gray-700">
                Assign New Activity
              </span>
            </button>

            <button
              onClick={() => {
                if (dashboard?.studentProgress[0]) {
                  apiClient.generateWeeklyReport(dashboard.studentProgress[0].id);
                }
              }}
              className="bg-gradient-to-br from-pastel-green to-pastel-blue hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-2xl p-6 flex items-center gap-4 cursor-pointer active:scale-95"
            >
              <Download size={32} className="text-gray-700" />
              <span className="text-lg font-bold text-gray-700">
                Download Weekly Report
              </span>
            </button>

            <button className="bg-pastel-pink hover:bg-pastel-peach transition-colors duration-300 rounded-2xl p-6 flex items-center gap-4 cursor-pointer active:scale-95">
              <span className="text-2xl">📝</span>
              <span className="text-lg font-bold text-gray-700">
                View Detailed Notes
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
