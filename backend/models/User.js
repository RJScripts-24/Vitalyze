import mongoose from "mongoose";

// Defines the structure for each PDF record
const pdfRecordSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  fileData: { type: Buffer, required: true },
  mimetype: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const profileSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  phone: String,
  address: String,
  avatarData: Buffer, // Profile image stored as Buffer
  avatarMimetype: String, // Image mimetype (e.g., 'image/jpeg')
  dob: String, // Date of birth
  bloodGroup: String, // Blood group
  emergencyContactName: String,
  emergencyContactPhone: String,
  // Add more fields as needed for prediction
});

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
  },
  password: { 
    type: String, 
    required: true,
    select: false, // Prevents password from being sent in API responses
  },
  role: { type: String, enum: ["institution", "patient"], default: "patient" },
  profile: profileSchema,
  isVerified: {
    type: Boolean,
    default: false,
  },
  pdfRecords: [pdfRecordSchema], // An array to hold all of a user's PDF records
});

export default mongoose.model("User", userSchema);
