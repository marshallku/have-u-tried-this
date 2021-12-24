/* eslint-disable import/extensions */
import express from "express";
import dotenv from "dotenv";

import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";

import morgan from "morgan";
import logger from "../logger/winston.js";

import callPassport from "../passport/index.js";
import routes from "../routes/index.js";

dotenv.config();

export default (app) => {
  callPassport();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false, limit: "30mb" }));
  app.use(cookieParser());

  app.use(passport.initialize());

  // log
  const combined =
    ":remote-addr - :remote-user ':method :url HTTP/:http-version' :status :res[content-length] ':referrer' ':user-agent'";
  const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : combined;
  app.use(morgan(morganFormat, { stream: logger.stream }));

  // routes
  app.use("/api", routes());
};
