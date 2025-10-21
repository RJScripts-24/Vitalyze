import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import upload from '../config/cloudinaryConfig.js'; // Now uses local memory storage
import auth from '../middleware/authMiddleware.js';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const router = express.Router();

// ROUTE 1: Register a new user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!password || password.length < 6) {
        return res.status(400).json({ msg: 'Password must be at least 6 characters long.' });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }
    user = new User({ email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ROUTE 2: Log in a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ROUTE 3: Upload a PDF (Protected Route)
router.post('/upload-pdf', auth, (req, res, next) => {
    upload.single('pdfFile')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ msg: 'File size exceeds 1MB limit' });
            }
            return res.status(400).json({ msg: `Upload error: ${err.message}` });
        } else if (err) {
            return res.status(500).json({ msg: 'Server error during upload' });
        }
        next();
    });
}, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'No file was uploaded.' });
        }
        const { originalname, buffer, mimetype } = req.file;
        const newPdfRecord = {
            fileName: originalname,
            fileData: buffer,
            mimetype: mimetype,
        };

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $push: { pdfRecords: newPdfRecord } },
            { new: true }
        );
        res.status(201).json({ msg: 'File uploaded successfully', record: newPdfRecord });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ROUTE 4: Get user's PDF records (Protected Route)
router.get('/pdfs', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        // Convert PDFs to base64 for frontend display
        const pdfs = user.pdfRecords.map(pdf => ({
            _id: pdf._id,
            fileName: pdf.fileName,
            createdAt: pdf.createdAt,
            dataUrl: `data:${pdf.mimetype};base64,${pdf.fileData.toString('base64')}`
        }));
        res.json({ pdfs });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;