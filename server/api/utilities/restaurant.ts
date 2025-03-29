import Logger from "../../utils/logUtils";
import { AuthenticatedRequest } from "../types/common.types";
import { processImage } from "./multer";
import path from "path";

interface RestaurantResult {
  success: boolean;
  message?: string;
  id?: string;
}

export const handleRestaurantAssignment = async (
  req: AuthenticatedRequest
): Promise<RestaurantResult> => {
  try {
    if (req.user?.isSuperAdmin) {
      const { restaurant } = req.body;
      if (!restaurant) {
        return {
          success: false,
          message: "Restaurant ID is required in body for super admin.",
        };
      }
      return { success: true, id: restaurant };
    }

    const restaurant = req.user?.restaurant;
    
    if (!restaurant) {
      return {
        success: false,
        message: "Restaurant ID is required.",
      };
    }
    return { success: true, id: restaurant.toString() };
  } catch (error) {
    Logger.error("Restaurant assignment error:", error);
    return {
      success: false,
      message: "Error processing restaurant assignment",
    };
  }
};

interface LogoResult {
  success: boolean;
  message?: string;
  url?: string;
}
export const handleRestaurantLogo = async (
  files:
    | { [fieldname: string]: Express.Multer.File[] }
    | Express.Multer.File
    | undefined,
  restaurantName: string
): Promise<LogoResult> => {
  try {
    // Handle case when no file is uploaded
    if (!files) {
      return {
        success: false,
        message: "No logo file provided",
      };
    }

    let logoFile: Express.Multer.File;

    // Handle both single file and multiple files cases
    if (Array.isArray((files as any).logo)) {
      // Case: multiple files under 'logo' field
      const logoFiles = (files as { logo: Express.Multer.File[] }).logo;
      if (!logoFiles || logoFiles.length === 0) {
        return {
          success: false,
          message: "No logo file found in the request",
        };
      }
      logoFile = logoFiles[0]; // Take the first file
    } else if ((files as Express.Multer.File).buffer) {
      // Case: single file
      logoFile = files as Express.Multer.File;
    } else {
      return {
        success: false,
        message: "Invalid file format",
      };
    }

    // Generate a unique filename
    const fileExtension = path.extname(logoFile.originalname);
    const sanitizedRestaurantName = restaurantName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-");
    const fileName = `${sanitizedRestaurantName}-${Date.now()}${fileExtension}`;

    // Process and upload the image
    const uploadResult = await processImage(logoFile, fileName);

    return {
      success: true,
      message: "Logo uploaded successfully",
      url: uploadResult.secure_url,
    };
  } catch (error) {
    Logger.error("Error handling restaurant logo:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to process logo upload",
    };
  }
};
