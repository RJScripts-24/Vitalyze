
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import upload from "../config/cloudinaryConfig.js"; // Now uses local memory storage
import multer from "multer";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// Get profile
router.get("/", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  
  // Convert avatar Buffer to base64 for frontend display
  const profile = user.profile.toObject();
  if (profile.avatarData && profile.avatarMimetype) {
    profile.avatarUrl = `data:${profile.avatarMimetype};base64,${profile.avatarData.toString('base64')}`;
    delete profile.avatarData; // Don't send raw buffer
    delete profile.avatarMimetype;
  }
  
  res.json({ profile, email: user.email, role: user.role });
});


// Upload avatar image
router.post("/upload-avatar", authMiddleware, (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size exceeds 1MB limit' });
      }
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(500).json({ error: 'Server error during upload' });
    }
    next();
  });
}, async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) return res.status(400).json({ error: "No image uploaded" });
    if (!req.file.mimetype?.startsWith('image/')) return res.status(400).json({ error: 'Only image files are allowed' });
    
    // Save avatar data to user profile
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { 
        "profile.avatarData": req.file.buffer,
        "profile.avatarMimetype": req.file.mimetype
      },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    
    // Return base64 encoded image for immediate display
    const avatarUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    res.json({ url: avatarUrl });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
});

// Update profile fields
router.post("/update", authMiddleware, async (req, res) => {
  const {
    username,
    email,
    password,
    dob,
    gender,
    phone,
    address,
    bloodGroup,
    emergencyContactName,
    emergencyContactPhone,
    avatarUrl,
  } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    // Profile fields
    if (typeof username !== "undefined") user.profile.name = username;
    if (typeof dob !== "undefined") user.profile.dob = dob;
    if (typeof gender !== "undefined") user.profile.gender = gender;
    if (typeof phone !== "undefined") user.profile.phone = phone;
    if (typeof address !== "undefined") user.profile.address = address;
    if (typeof bloodGroup !== "undefined") user.profile.bloodGroup = bloodGroup;
    if (typeof emergencyContactName !== "undefined") user.profile.emergencyContactName = emergencyContactName;
    if (typeof emergencyContactPhone !== "undefined") user.profile.emergencyContactPhone = emergencyContactPhone;
    // Note: avatarUrl is now handled via upload-avatar endpoint

    // Email change (ensure uniqueness)
    if (email && email !== user.email) {
      const existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ error: "Email already in use" });
      user.email = email.toLowerCase();
    }

    // Password change
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      user.password = hash;
    }
    await user.save();
    res.json({ profile: user.profile, email: user.email });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

export default router;
