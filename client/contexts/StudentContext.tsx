import React, { createContext, useContext, useState, ReactNode } from "react";
import { StudentStats, mockStudentStats } from "@/services/gameService";

interface StudentContextType {
  student: StudentStats;
  updateStudent: (student: Partial<StudentStats>) => void;
  setSoundEnabled: (enabled: boolean) => void;
  updateProgressStars: (stars: number) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [student, setStudent] = useState<StudentStats>(mockStudentStats);

  const updateStudent = (updates: Partial<StudentStats>) => {
    setStudent((prev) => ({ ...prev, ...updates }));
  };

  const setSoundEnabled = (enabled: boolean) => {
    updateStudent({ soundEnabled: enabled });
  };

  const updateProgressStars = (stars: number) => {
    updateStudent({ progressStars: Math.min(stars, 5) });
  };

  return (
    <StudentContext.Provider
      value={{
        student,
        updateStudent,
        setSoundEnabled,
        updateProgressStars,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within StudentProvider");
  }
  return context;
};
