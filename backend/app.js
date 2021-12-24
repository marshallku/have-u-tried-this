/* eslint-disable import/extensions */
import express from "express";
import dotenv from "dotenv";
import logger from "./logger/winston.js";
import loader from "./loader/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

loader(app);

// server listen
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    logger.info(`Server Start Listening at ${port}`);
  });
}

export default app;
