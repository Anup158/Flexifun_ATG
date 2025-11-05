import mongoose from "mongoose";

export interface IGameProgress extends mongoose.Document {
  studentId: mongoose.Types.ObjectId;
  moduleId: string;
  completed: number;
  total: number;
  accuracy: number;
  timeSpent: number;
  lastPlayedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const gameProgressSchema = new mongoose.Schema<IGameProgress>(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    moduleId: {
      type: String,
      required: true,
      enum: [
        "emotional-recognition",
        "theory-of-mind",
        "executive-function",
        "social-communication",
      ],
    },
    completed: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 5,
    },
    accuracy: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    timeSpent: {
      type: Number,
      default: 0,
    },
    lastPlayedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

gameProgressSchema.index({ studentId: 1, moduleId: 1 }, { unique: true });

export const GameProgress =
  mongoose.models.GameProgress ||
  mongoose.model<IGameProgress>("GameProgress", gameProgressSchema);
