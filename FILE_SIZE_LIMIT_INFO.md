# File Size Limit Implementation

## Overview
All file uploads (avatars and PDFs) are now limited to **1MB maximum**.

## Implementation Details

### 1. Multer Configuration (`backend/config/cloudinaryConfig.js`)
```javascript
const upload = multer({ 
  storage,
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB in bytes (1048576 bytes)
  }
});
```

### 2. Error Handling

#### Avatar Upload (`/api/profile/upload-avatar`)
- Returns HTTP 400 with message: `"File size exceeds 1MB limit"`
- Validates before saving to database

#### PDF Upload (`/api/users/upload-pdf`)
- Returns HTTP 400 with message: `"File size exceeds 1MB limit"`
- Validates before saving to database

### 3. User-Facing Errors

When a user tries to upload a file larger than 1MB:

**Response:**
```json
{
  "error": "File size exceeds 1MB limit"
}
```

**Status Code:** `400 Bad Request`

## Frontend Implementation Recommendation

Add client-side validation before upload:

```javascript
const handleFileUpload = (file) => {
  const maxSize = 1 * 1024 * 1024; // 1MB
  
  if (file.size > maxSize) {
    alert('File size must be less than 1MB');
    return;
  }
  
  // Proceed with upload
  uploadFile(file);
};
```

## Benefits

✅ **Prevents database bloat** - Keeps documents small  
✅ **Faster uploads** - Small files transfer quickly  
✅ **Better UX** - Clear error messages  
✅ **Security** - Prevents malicious large file uploads  
✅ **Cost-effective** - Reduces bandwidth and storage

## File Size Reference

- **1MB** = 1,048,576 bytes
- Typical avatar image (compressed): 50-300 KB
- 1MB JPEG: ~3000x2000 pixels (high quality)
- 1MB PNG: ~1500x1000 pixels
- 1MB PDF: ~5-10 pages of text

## Adjusting the Limit

To change the limit, edit `backend/config/cloudinaryConfig.js`:

```javascript
limits: {
  fileSize: 2 * 1024 * 1024, // 2MB
}
```

Remember to update error messages and documentation accordingly.
