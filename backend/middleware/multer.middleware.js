const multer = require("multer");
const path = require("path");
const fs = require("fs");

// IMPORTANT: Use absolute path, not relative!
const uploadDir = path.join(__dirname, "..", "public", "temp");

// Ensure directory exists IMMEDIATELY
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("✅ Created upload directory:", uploadDir);
} else {
    console.log("✅ Upload directory exists:", uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Double-check it exists before each upload
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Add timestamp to prevent conflicts
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;