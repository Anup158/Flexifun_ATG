export interface GameModule {
  id: string;
  title: string;
  emoji: string;
  description: string;
  color: string;
  icon: string;
  category: "emotional" | "cognitive" | "executive" | "social";
}

export interface GameProgress {
  moduleId: string;
  completed: number;
  total: number;
  accuracy: number;
  timeSpent: number;
}

export interface StudentStats {
  name: string;
  avatar: string;
  totalSessions: number;
  totalHours: number;
  currentStreak: number;
  progressStars: number;
  soundEnabled: boolean;
}

export const gameModules: GameModule[] = [
  {
    id: "emotional-recognition",
    title: "Emotional Recognition",
    emoji: "🎭",
    description: "Identify and understand emotions",
    color: "from-rose-200 to-pink-200",
    icon: "😊",
    category: "emotional",
  },
  {
    id: "theory-of-mind",
    title: "Theory of Mind",
    emoji: "🧠",
    description: "Understand thoughts and perspectives",
    color: "from-blue-200 to-cyan-200",
    icon: "💭",
    category: "cognitive",
  },
  {
    id: "executive-function",
    title: "Executive Function",
    emoji: "📋",
    description: "Planning and organization skills",
    color: "from-amber-200 to-yellow-200",
    icon: "✅",
    category: "executive",
  },
  {
    id: "social-communication",
    title: "Social Communication",
    emoji: "👥",
    description: "Social interaction and reciprocity",
    color: "from-green-200 to-emerald-200",
    icon: "💬",
    category: "social",
  },
];

export const getGameModuleById = (id: string): GameModule | undefined => {
  return gameModules.find((m) => m.id === id);
};

export const getGamesByCategory = (
  category: GameModule["category"],
): GameModule[] => {
  return gameModules.filter((m) => m.category === category);
};

export const mockStudentStats: StudentStats = {
  name: "Learner Name",
  avatar: "🦁",
  totalSessions: 24,
  totalHours: 4.5,
  currentStreak: 7,
  progressStars: 3,
  soundEnabled: true,
};
