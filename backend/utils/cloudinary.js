const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("❌ No file path provided");
            return null;
        }
        
        // Check if file exists
        if (!fs.existsSync(localFilePath)) {
            console.log("❌ File does not exist:", localFilePath);
            return null;
        }
        
        console.log("📤 Uploading to Cloudinary:", localFilePath);
        
        // Upload file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "nomadyatra"
        });
        
        console.log("✅ Uploaded to Cloudinary:", response.secure_url);
        
        // Delete local file after successful upload
        fs.unlinkSync(localFilePath);
        console.log("🗑️ Deleted local file:", localFilePath);
        
        return response;
        
    } catch (error) {
        console.error("❌ Cloudinary upload error:", error.message);
        
        // Remove temp file even if upload failed
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
            console.log("🗑️ Cleaned up failed upload file");
        }
        
        return null;
    }
};

module.exports = uploadOnCloudinary;