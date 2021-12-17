/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import favicon from "serve-favicon";
import httpError from "http-errors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import postRouter from "./routes/posts.js";
import locationRouter from "./routes/locations.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(json());

// parsers, session, and favicon
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const __dirname = path.resolve();
app.use(express.static(`${__dirname}/public`));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(cookieParser());
app.use(
  session({
    secret: "this-is-sample-secret-key",
    resave: false,
    saveUninitialized: true,
  }),
);

// mongo DB & mongoose
const mongoUri = process.env.MONGO_DB_URI;
mongoose.connect(`${mongoUri}/test`);

// routes
app.use("/api/locations", locationRouter);
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);

// server listen
app.listen(port, () => {
  // console.log("Server start");
});

// Error handler
// 404 error
app.use((req, res, next) => {
  next(httpError(404));
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send({ message: err });
});
