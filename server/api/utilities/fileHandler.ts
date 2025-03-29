import Logger from "../../utils/logUtils";
import { processImage } from "./multer";
// * User file upload
interface FileUploadResult {
  profileImgPath: string;
  docPaths: string[];
}

export interface UploadedFiles {
  profileImg?: Express.Multer.File[];
  docs?: Express.Multer.File[];
}

export const handleUserFiles = async (
  files: UploadedFiles
): Promise<FileUploadResult> => {
  try {
    let profileImgPath = "";
    let docPaths: string[] = [];

    if (!files) {
      return { profileImgPath, docPaths };
    }

    // Handle profile image
    if (files.profileImg && files.profileImg.length > 0) {
      const profileImg = files.profileImg[0];
      const fileName = `profile-${Date.now()}-${profileImg.originalname}`;
      const result = await processImage(profileImg, fileName);
      profileImgPath = result.secure_url;
    }

    // Handle documents
    if ("docs" in files) {
      const docs = files.docs;
      if (!Array.isArray(docs)) {
        throw new Error("Invalid document format");
      }
      docPaths = await Promise.all(
        docs.map(async (doc: Express.Multer.File) => {
          const fileName = `doc-${Date.now()}-${doc.originalname}`;
          const result = await processImage(doc, fileName);
          return result.secure_url;
        })
      );
    }

    return { profileImgPath, docPaths };
  } catch (error) {
    Logger.error("File handling error:", error);
    throw new Error("Failed to process uploaded files");
  }
};


