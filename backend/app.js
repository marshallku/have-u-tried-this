/* eslint-disable import/extensions */
import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRouter from "./routes/posts.js";
import locationRouter from "./routes/locations.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(json());

// mongo DB & mongoose
const mongoUri = process.env.MONGO_DB_URI;
mongoose.connect(mongoUri);

// routes
app.use("/api/locations", locationRouter);
app.use("/api/posts", postRouter);

// 404 error
app.use((req, res, next) => {
  next("404 Not Found");
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(400).json({ message: err });
});

// server listen
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    // console.log("Server start");
  });
}

export default app;
