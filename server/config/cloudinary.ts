import { v2 as cloudinary } from "cloudinary";
// Validate required environment variables
const requiredEnvVars = [
  "CLOUDINARY_URL"
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

// Initialize Cloudinary with environment variables
cloudinary.config({
  cloud_url: process.env.CLOUDINARY_URL,
});

export default cloudinary;
