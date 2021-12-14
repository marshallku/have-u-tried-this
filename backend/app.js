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
// 라우터 예시코드
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// 404 error
app.use((req, res, next) => {
  next("404 Not Found");
});

// Error handler
app.use((err, req, res, next) => {
  res.json({ status: false, message: err });
});

// server listen
app.listen(port, () => {
  console.log("Server start");
});
