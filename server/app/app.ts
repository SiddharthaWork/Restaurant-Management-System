import express from "express";
import http from "http";
import "dotenv/config";
import * as dotenv from "dotenv";

import authController from "../api/controllers/auth.controller";
import Logger from "../utils/logUtils";
import { connectDB } from "../database/mongoose";
import configureRoutes from "../config/routes";
import { configureMiddleware } from "../api/middlewares/middleware";

const app = express();
const corsOptions = {
  origin: "*",
};
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
configureMiddleware(app);
configureRoutes(app);
app.get("/", (req, res) => {
  res.status(200).send("hello");
});

connectDB().then(() => {
  authController.adminSeeder();
  server.listen(PORT, () => Logger.info(`Server running on port ${PORT} 🚀`));
});
