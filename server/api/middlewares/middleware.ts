import morgan from "morgan";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import constants from "../constants";
export const configureMiddleware = (app: express.Application): void => {
  app.use(cors(constants.corsOptions));

  //* Logging middleware
  const environment = process.env.NODE_ENV || "development";
  app.use(morgan(environment === "development" ? "dev" : "combined"));
  //* Body parsing middleware
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  //* Security middleware
  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(
    helmet.hsts({
      maxAge: 7776000000,
      includeSubDomains: true,
    })
  );
  app.use(helmet.hidePoweredBy());
};
