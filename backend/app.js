/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRouter from "./routes/posts.js";
import locationRouter from "./routes/locations.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(json());

// mongo DB & mongoose
const mongoUri = process.env.MONGO_DB_URI;
mongoose.connect(`${mongoUri}/test`);

// routes
app.use("/api/locations", locationRouter);
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);

// Error handler
// 404 error
app.use((req, res, next) => {
  next("404 Not Found");
});
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ message: err });
});

// server listen
app.listen(port, () => {
  // console.log("Server start");
});
