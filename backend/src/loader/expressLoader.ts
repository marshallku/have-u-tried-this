/* eslint-disable import/extensions */
import express, { Router } from "express";
import dotenv from "dotenv";

import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";

import callPassport from "../passport/index";
import routes from "../routes/index";

dotenv.config();

export default (app: Router) => {
  callPassport();

  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: false, limit: "50mb" }));
  app.use(cookieParser());

  app.use(passport.initialize());

  // routes
  app.use("/api", routes());
};
