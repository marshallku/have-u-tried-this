/* eslint-disable import/extensions */
import dbLoader from "./dbLoader.js";
import expressLoader from "./expressLoader.js";
import errorHandler from "./errorHandler.js";
import logger from "../logger/winston.js";

export default (app) => {
  dbLoader();
  expressLoader(app);
  errorHandler(app);
  logger.info("loaded express and db");
};
