import mongoose from "mongoose";
import Logger from "../utils/logUtils";
import constants from "../api/constants";

export const connectDB = async () => {
  try {
    await mongoose.connect(constants.URI, {});
    Logger.info("Database connected successfully");
  } catch (error) {
    Logger.error(`Error in Connecting to database`, error);
  }
};
