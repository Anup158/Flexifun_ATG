import mongoose from "mongoose";

export interface ITherapist extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  organization: string;
  assignedStudents: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const therapistSchema = new mongoose.Schema<ITherapist>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      default: "Independent",
    },
    assignedStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true }
);

export const Therapist =
  mongoose.models.Therapist ||
  mongoose.model<ITherapist>("Therapist", therapistSchema);
