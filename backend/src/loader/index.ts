import { Router } from "express";
import dbLoader from "./dbLoader";
import expressLoader from "./expressLoader";
import errorHandler from "./errorHandler";

export default (app: Router) => {
  dbLoader();
  expressLoader(app);
  errorHandler(app);
};
