import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/database";
import {
  authMiddleware,
  studentAuthMiddleware,
  therapistAuthMiddleware,
} from "./middleware/auth";
import * as authRoutes from "./routes/auth";
import * as studentRoutes from "./routes/student";
import * as therapistRoutes from "./routes/therapist";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize Database
  connectDatabase().catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Demo endpoint (legacy)
  app.get("/api/demo", handleDemo);
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // ============ Authentication Routes ============
  app.post("/api/auth/student/signup", authRoutes.studentSignup);
  app.post("/api/auth/student/login", authRoutes.studentLogin);
  app.post("/api/auth/therapist/signup", authRoutes.therapistSignup);
  app.post("/api/auth/therapist/login", authRoutes.therapistLogin);

  // ============ Student Routes (Protected) ============
  app.get(
    "/api/student/profile",
    studentAuthMiddleware,
    studentRoutes.getStudentProfile,
  );
  app.put(
    "/api/student/profile",
    studentAuthMiddleware,
    studentRoutes.updateStudentProfile,
  );
  app.get(
    "/api/student/progress",
    studentAuthMiddleware,
    studentRoutes.getStudentProgress,
  );
  app.put(
    "/api/student/progress",
    studentAuthMiddleware,
    studentRoutes.updateGameProgress,
  );
  app.get(
    "/api/student/stats",
    studentAuthMiddleware,
    studentRoutes.getStudentStats,
  );

  // ============ Therapist Routes (Protected) ============
  app.get(
    "/api/therapist/dashboard",
    therapistAuthMiddleware,
    therapistRoutes.getTherapistDashboard,
  );
  app.post(
    "/api/therapist/assign-student",
    therapistAuthMiddleware,
    therapistRoutes.assignStudent,
  );
  app.get(
    "/api/therapist/student/:studentId/progress",
    therapistAuthMiddleware,
    therapistRoutes.getStudentProgress,
  );
  app.get(
    "/api/therapist/student/:studentId/report",
    therapistAuthMiddleware,
    therapistRoutes.generateWeeklyReport,
  );

  return app;
}
