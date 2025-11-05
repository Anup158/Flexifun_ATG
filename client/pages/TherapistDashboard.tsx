import { Link } from "react-router-dom";
import { LogOut, Download, Plus } from "lucide-react";

export default function TherapistDashboard() {
  const students = [
    { id: 1, name: "Alex", avatar: "🦁", progress: 60 },
    { id: 2, name: "Jordan", avatar: "🐯", progress: 75 },
    { id: 3, name: "Sam", avatar: "🐻", progress: 45 },
  ];

  const skills = [
    { name: "Communication", progress: 65, emoji: "💬" },
    { name: "Focus & Attention", progress: 58, emoji: "👀" },
    { name: "Motor Skills", progress: 72, emoji: "✋" },
    { name: "Social Interaction", progress: 50, emoji: "👥" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-blue via-pastel-lavender to-pastel-pink">
      {/* Header */}
      <div className="bg-white shadow-lg p-4 md:p-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            Therapist Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Welcome back! 👩‍⚕️</p>
        </div>
        <Link to="/">
          <button className="bg-pastel-pink hover:bg-pastel-peach transition-colors duration-300 rounded-2xl p-4 md:p-5 flex items-center gap-2 cursor-pointer active:scale-95 shadow-lg">
            <LogOut size={24} className="text-gray-700" />
            <span className="font-bold text-gray-700 hidden md:inline">
              Logout
            </span>
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
        {/* Progress Tracking Section */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            📊 Student Progress
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
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
                      Session: 15 completed
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-pastel-blue to-pastel-lavender h-4 rounded-full transition-all duration-500"
                    style={{ width: `${student.progress}%` }}
                  ></div>
                </div>
                <p className="text-right text-sm font-semibold text-gray-700 mt-2">
                  {student.progress}% Complete
                </p>
              </div>
            ))}
          </div>
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
                    {skill.progress}%
                  </span>
                </div>
                <div className="w-full bg-white bg-opacity-50 rounded-full h-3">
                  <div
                    className="bg-white h-3 rounded-full transition-all duration-500"
                    style={{ width: `${skill.progress}%` }}
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
              {[
                { date: "Today", student: "Alex", activity: "Emotions Game" },
                { date: "Yesterday", student: "Jordan", activity: "Puzzle" },
                {
                  date: "Dec 15",
                  student: "Sam",
                  activity: "Music & Movement",
                },
              ].map((session, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-pastel-lavender rounded-xl hover:bg-pastel-pink transition-colors duration-300"
                >
                  <p className="font-bold text-gray-800">{session.student}</p>
                  <p className="text-sm text-gray-600">{session.activity}</p>
                  <p className="text-xs text-gray-500 mt-1">{session.date}</p>
                </div>
              ))}
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

            <button className="bg-gradient-to-br from-pastel-green to-pastel-blue hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-2xl p-6 flex items-center gap-4 cursor-pointer active:scale-95">
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
