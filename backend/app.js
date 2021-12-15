const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// mongo DB & mongoose
const mongoUri = process.env.MONGO_DB_URI;
mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
  console.log("MongDB connected");
});

// routes
const locationRouter = require("./routes/locations");
const postRouter = require("./routes/posts");

app.use("/api/locations", locationRouter);
app.use("/api/posts", postRouter);

// 404 error
app.use((req, res, next) => {
  next("404 Not Found");
});

// Error handler
app.use((err, req, res, next) => {
  res.json({ message: err });
});

// server listen
app.listen(port, () => {
  console.log("Server start");
});
