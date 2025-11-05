import { RequestHandler } from "express";
import { Student } from "../models/Student";
import { Therapist } from "../models/Therapist";
import { hashPassword, comparePasswords, generateToken } from "../utils/auth";

export const studentLogin: RequestHandler = async (req, res) => {
  try {
    const { pinCode } = req.body;

    if (!pinCode) {
      return res.status(400).json({ error: "PIN code required" });
    }

    const student = await Student.findOne({ pinCode });

    if (!student) {
      return res.status(401).json({ error: "Invalid PIN code" });
    }

    const token = generateToken({ id: student._id.toString(), type: "student" });

    res.json({
      token,
      student: {
        id: student._id,
        name: student.name,
        avatar: student.avatar,
        progressStars: student.progressStars,
        soundEnabled: student.soundEnabled,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const studentSignup: RequestHandler = async (req, res) => {
  try {
    const { name, avatar, pinCode } = req.body;

    if (!name || !pinCode) {
      return res.status(400).json({ error: "Name and PIN code required" });
    }

    const existingStudent = await Student.findOne({ pinCode });
    if (existingStudent) {
      return res.status(400).json({ error: "PIN code already in use" });
    }

    const student = new Student({
      name,
      avatar: avatar || "🦁",
      pinCode,
      password: await hashPassword(pinCode),
    });

    await student.save();

    const token = generateToken({ id: student._id.toString(), type: "student" });

    res.status(201).json({
      token,
      student: {
        id: student._id,
        name: student.name,
        avatar: student.avatar,
        progressStars: student.progressStars,
        soundEnabled: student.soundEnabled,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
  }
};

export const therapistLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password required" });
    }

    const therapist = await Therapist.findOne({ email });

    if (!therapist || !(await comparePasswords(password, therapist.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken({
      id: therapist._id.toString(),
      type: "therapist",
    });

    res.json({
      token,
      therapist: {
        id: therapist._id,
        name: therapist.name,
        email: therapist.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const therapistSignup: RequestHandler = async (req, res) => {
  try {
    const { name, email, password, organization } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password required" });
    }

    const existingTherapist = await Therapist.findOne({ email });
    if (existingTherapist) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const therapist = new Therapist({
      name,
      email,
      password: await hashPassword(password),
      organization: organization || "Independent",
    });

    await therapist.save();

    const token = generateToken({
      id: therapist._id.toString(),
      type: "therapist",
    });

    res.status(201).json({
      token,
      therapist: {
        id: therapist._id,
        name: therapist.name,
        email: therapist.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
  }
};
