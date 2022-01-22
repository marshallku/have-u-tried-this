/* eslint-disable import/extensions */
import express from "express";
import dotenv from "dotenv";
import loader from "./loader/index";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

loader(app);

// server listen
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {});
}

export default app;
