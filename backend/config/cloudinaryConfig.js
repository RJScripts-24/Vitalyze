import multer from 'multer';

// Use memory storage for multer (files will be available as Buffer in req.file.buffer)
const storage = multer.memoryStorage();

// Configure multer with file size limit (1MB = 1048576 bytes)
const upload = multer({ 
  storage,
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB in bytes
  },
  fileFilter: (req, file, cb) => {
    // Optional: Add additional file type validation here
    cb(null, true);
  }
});

export default upload;