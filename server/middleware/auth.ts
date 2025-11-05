import { RequestHandler } from "express";
import { verifyToken, JWTPayload } from "../utils/auth";

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.user = payload;
  next();
};

export const studentAuthMiddleware: RequestHandler = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user?.type !== "student") {
      return res.status(403).json({ error: "Student access required" });
    }
    next();
  });
};

export const therapistAuthMiddleware: RequestHandler = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user?.type !== "therapist") {
      return res.status(403).json({ error: "Therapist access required" });
    }
    next();
  });
};
