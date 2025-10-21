import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Register
router.post("/register", async (req, res) => {
  const { email, password, profile } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });
  try {
    const cleanEmail = String(email).trim().toLowerCase();
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) return res.status(409).json({ error: "Email already registered" });
    const hash = await bcrypt.hash(password, 10);
    const role = cleanEmail.endsWith("@vitalyze.ac.in") ? "institution" : "patient";
    const user = await User.create({ email: cleanEmail, password: hash, role, profile });
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, role: user.role, profile: user.profile });
  } catch (err) {
    console.error('Registration error:', err?.message);
    if (err?.code === 11000) {
      return res.status(409).json({ error: "Email already registered" });
    }
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });
  try {
    const user = await User.findOne({ email }).select('+password'); // Explicitly select password field
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });
    // Enforce domain policy: only @vitalyze.ac.in can hold 'institution' role
    const isInstitutionDomain = user.email.toLowerCase().endsWith('@vitalyze.ac.in');
    let effectiveRole = user.role;
    if (user.role === 'institution' && !isInstitutionDomain) {
      // Downgrade role for non-compliant email domains
      effectiveRole = 'patient';
      try {
        user.role = 'patient';
        await user.save();
      } catch (e) {
        // If persisting fails, still enforce via token/response
        console.warn('Role downgrade persist failed:', e?.message);
      }
    }
    const token = jwt.sign({ id: user._id, role: effectiveRole }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, role: effectiveRole, profile: user.profile });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
