import { RequestHandler } from "express";
import { Student } from "../models/Student";
import { GameProgress } from "../models/GameProgress";
import { Session } from "../models/Session";

export const getStudentProfile: RequestHandler = async (req, res) => {
  try {
    const studentId = req.user?.id;

    if (!studentId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const student =
      await Student.findById(studentId).select("-password -pinCode");

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

export const updateStudentProfile: RequestHandler = async (req, res) => {
  try {
    const studentId = req.user?.id;
    const { name, avatar, soundEnabled } = req.body;

    if (!studentId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const student = await Student.findByIdAndUpdate(
      studentId,
      { name, avatar, soundEnabled },
      { new: true },
    ).select("-password -pinCode");

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export const getStudentProgress: RequestHandler = async (req, res) => {
  try {
    const studentId = req.user?.id;

    if (!studentId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const progress = await GameProgress.find({ studentId });

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch progress" });
  }
};

export const updateGameProgress: RequestHandler = async (req, res) => {
  try {
    const studentId = req.user?.id;
    const { moduleId, completed, accuracy, timeSpent } = req.body;

    if (!studentId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let progress = await GameProgress.findOne({ studentId, moduleId });

    if (!progress) {
      progress = new GameProgress({
        studentId,
        moduleId,
        completed: completed || 0,
        accuracy: accuracy || 0,
        timeSpent: timeSpent || 0,
      });
    } else {
      progress.completed = completed || progress.completed;
      progress.accuracy = accuracy || progress.accuracy;
      progress.timeSpent = (progress.timeSpent || 0) + (timeSpent || 0);
      progress.lastPlayedAt = new Date();
    }

    await progress.save();

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: "Failed to update progress" });
  }
};

export const getStudentStats: RequestHandler = async (req, res) => {
  try {
    const studentId = req.user?.id;

    if (!studentId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const student = await Student.findById(studentId);
    const sessions = await Session.find({ studentId });

    res.json({
      student: {
        name: student?.name,
        avatar: student?.avatar,
        progressStars: student?.progressStars,
        soundEnabled: student?.soundEnabled,
      },
      stats: {
        totalSessions: sessions.length,
        totalHours:
          sessions.reduce((sum, s) => sum + (s.duration || 0), 0) / 60,
        currentStreak: student?.currentStreak || 0,
        totalPoints: sessions.reduce(
          (sum, s) => sum + (s.pointsEarned || 0),
          0,
        ),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
