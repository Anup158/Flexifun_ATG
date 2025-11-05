import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "flexifun-secret-key-change-in-production";
const JWT_EXPIRE = "7d";

export interface JWTPayload {
  id: string;
  type: "student" | "therapist";
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcryptjs.compare(password, hashedPassword);
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}
