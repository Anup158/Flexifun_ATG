import { RequestHandler } from "express";
import { Therapist } from "../models/Therapist";
import { Student } from "../models/Student";
import { GameProgress } from "../models/GameProgress";
import { Session } from "../models/Session";
import mongoose from "mongoose";

export const getTherapistDashboard: RequestHandler = async (req, res) => {
  try {
    const therapistId = req.user?.id;

    if (!therapistId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const therapist = await Therapist.findById(therapistId).populate(
      "assignedStudents"
    );

    if (!therapist) {
      return res.status(404).json({ error: "Therapist not found" });
    }

    const studentIds = therapist.assignedStudents.map(
      (s: any) => new mongoose.Types.ObjectId(s._id)
    );

    const studentProgress = await Promise.all(
      therapist.assignedStudents.map(async (studentId: any) => {
        const student = await Student.findById(studentId);
        const sessions = await Session.find({ studentId });
        const progress = await GameProgress.find({ studentId });

        return {
          id: studentId,
          name: student?.name,
          avatar: student?.avatar,
          sessionsCompleted: sessions.length,
          avgAccuracy:
            progress.length > 0
              ? (
                  progress.reduce((sum, p) => sum + p.accuracy, 0) /
                  progress.length
                ).toFixed(2)
              : 0,
          progressPercentage: student?.progressStars
            ? (student.progressStars / 5) * 100
            : 0,
        };
      })
    );

    const recentSessions = await Session.find({ therapistId })
      .populate("studentId", "name avatar")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      therapist: {
        id: therapist._id,
        name: therapist.name,
        email: therapist.email,
      },
      studentProgress,
      recentSessions: recentSessions.map((s) => ({
        id: s._id,
        studentName: (s.studentId as any)?.name,
        studentAvatar: (s.studentId as any)?.avatar,
        moduleId: s.moduleId,
        duration: s.duration,
        accuracy: s.accuracy,
        createdAt: s.createdAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard" });
  }
};

export const assignStudent: RequestHandler = async (req, res) => {
  try {
    const therapistId = req.user?.id;
    const { studentId } = req.body;

    if (!therapistId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const therapist = await Therapist.findByIdAndUpdate(
      therapistId,
      { $addToSet: { assignedStudents: studentId } },
      { new: true }
    );

    res.json(therapist);
  } catch (error) {
    res.status(500).json({ error: "Failed to assign student" });
  }
};

export const getStudentProgress: RequestHandler = async (req, res) => {
  try {
    const { studentId } = req.params;

    const progress = await GameProgress.find({ studentId });
    const sessions = await Session.find({ studentId });

    const skillsProgress = [
      {
        name: "Communication",
        progress: progress.find((p) => p.moduleId === "social-communication")
          ?.accuracy || 0,
        emoji: "💬",
      },
      {
        name: "Focus & Attention",
        progress:
          progress.find((p) => p.moduleId === "executive-function")?.accuracy ||
          0,
        emoji: "👀",
      },
      {
        name: "Motor Skills",
        progress:
          progress.find((p) => p.moduleId === "emotional-recognition")
            ?.accuracy || 0,
        emoji: "✋",
      },
      {
        name: "Social Interaction",
        progress: progress.find((p) => p.moduleId === "theory-of-mind")
          ?.accuracy || 0,
        emoji: "👥",
      },
    ];

    res.json({
      moduleProgress: progress,
      sessions: sessions.slice(-20),
      skillsProgress,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student progress" });
  }
};

export const generateWeeklyReport: RequestHandler = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);
    const sessions = await Session.find({
      studentId,
      createdAt: {
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    });

    const progress = await GameProgress.find({ studentId });

    const report = {
      studentName: student?.name,
      week: `${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]} to ${new Date().toISOString().split("T")[0]}`,
      sessionsThisWeek: sessions.length,
      totalMinutes: sessions.reduce((sum, s) => sum + (s.duration || 0), 0),
      averageAccuracy:
        sessions.length > 0
          ? (sessions.reduce((sum, s) => sum + (s.accuracy || 0), 0) / sessions.length).toFixed(2)
          : 0,
      moduleBreakdown: progress.map((p) => ({
        module: p.moduleId,
        completed: p.completed,
        accuracy: p.accuracy,
      })),
      timestamp: new Date(),
    };

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate report" });
  }
};
