import mongoose from "mongoose";

export interface ISession extends mongoose.Document {
  studentId: mongoose.Types.ObjectId;
  therapistId: mongoose.Types.ObjectId;
  moduleId: string;
  duration: number;
  accuracy: number;
  pointsEarned: number;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema<ISession>(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    therapistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      required: false,
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
    duration: {
      type: Number,
      required: true,
    },
    accuracy: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    pointsEarned: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Session =
  mongoose.models.Session ||
  mongoose.model<ISession>("Session", sessionSchema);
