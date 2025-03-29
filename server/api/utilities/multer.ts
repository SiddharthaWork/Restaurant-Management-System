import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import cloudinary from "../../config/cloudinary";
import Logger from "../../utils/logUtils";
import { formatResponse } from "./formatRes";

// Types
export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
}

// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/jpg", "image/png"]);
const ALLOWED_FILE_EXTENSIONS = /\.(jpg|jpeg|png)$/i;

// File filter function
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  try {
    // Check MIME type
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(new Error("Invalid file type. Only JPEG, JPG, and PNG are allowed"));
      return;
    }

    // Check file extension
    if (!ALLOWED_FILE_EXTENSIONS.test(path.extname(file.originalname))) {
      cb(
        new Error(
          "Invalid file extension. Only .jpg, .jpeg, and .png are allowed"
        )
      );
      return;
    }

    cb(null, true);
  } catch (error) {
    Logger.error("Error in file filter:", error);
    cb(new Error("Error processing file"));
  }
};

// Multer configuration
export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

// Process and upload image to Cloudinary
export const processImage = async (
  file: Express.Multer.File,
  fileName: string
): Promise<CloudinaryUploadResult> => {
  if (!file?.buffer || !fileName) {
    throw new Error(
      "Invalid input parameters: file buffer or fileName missing"
    );
  }

  try {
    // Convert buffer to base64
    const base64File = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;

    // Upload to Cloudinary with optimizations
    const result = await cloudinary.uploader.upload(base64File, {
      resource_type: "auto",
      public_id: `uploads/${fileName}`,
      transformation: [
        { quality: "auto:good", fetch_format: "auto" },
        { width: 800, height: 800, crop: "limit" },
      ],
      folder: "uploads",
      use_filename: true,
      unique_filename: true,
    });

    Logger.info("Image uploaded successfully:", result.public_id);

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    Logger.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload image to cloud storage");
  }
};
