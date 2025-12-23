const app = require("./app")
const path = require("path");
const fs = require("fs");


const publicDir = path.join(__dirname, "public");
const tempDir = path.join(__dirname, "public", "temp");

[publicDir, tempDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✅ Created directory: ${dir}`);
    } else {
        console.log(`✅ Directory exists: ${dir}`);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
