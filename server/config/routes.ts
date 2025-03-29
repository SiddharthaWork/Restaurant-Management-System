import * as glob from "glob";
import { Application, Router } from "express";
import Logger from "../utils/logUtils";
import path from "path";

export default (app: Application): void => {
  //check if prod or not
  const isProduction = process.env.NODE_ENV === "production";
  
   
  // Construct the route path
  const routePath: string = path.resolve(
    __dirname,
    `../api/**/*.routes.*`
  );
  const version: string = "/api/v1/:en";

  Logger.info(`Looking for route files in: ${routePath}`);
  const mainRouter = Router();
  //* Sync pattern matching for routes
  glob.sync(routePath).forEach((file: string) => {
    try {
      const route = require(file).default;
      if (route && typeof route.stack === "object") {
        mainRouter.use(version, route);
        Logger.info(`Loaded route from ${file}`);
      } else {
        Logger.warn(`File ${file} does not export a Router`);
      }
    } catch (err: any) {
      Logger.error(`Error loading route file ${file}: ${err.message}`);
    }
  });

  app.use(mainRouter);
  Logger.info("Routes are loading...");
};
