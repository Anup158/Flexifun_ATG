import mongoose from "mongoose";

export interface IStudent extends mongoose.Document {
  name: string;
  avatar: string;
  password: string;
  pinCode: string;
  soundEnabled: boolean;
  progressStars: number;
  totalSessions: number;
  totalHours: number;
  currentStreak: number;
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new mongoose.Schema<IStudent>(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "🦁",
    },
    password: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    soundEnabled: {
      type: Boolean,
      default: true,
    },
    progressStars: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalSessions: {
      type: Number,
      default: 0,
    },
    totalHours: {
      type: Number,
      default: 0,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const Student =
  mongoose.models.Student || mongoose.model<IStudent>("Student", studentSchema);
