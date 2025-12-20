const app = require("./app")
const express = require("express");
const path = require("path");
const fs = require("fs");


// ===== CREATE TEMP FOLDER ON STARTUP =====
const publicDir = path.join(__dirname, "public");
const tempDir = path.join(__dirname, "public", "temp");

// Create both directories
[publicDir, tempDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✅ Created directory: ${dir}`);
    } else {
        console.log(`✅ Directory exists: ${dir}`);
    }
});

// ... rest of your server code
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
