const express = require("express");
const app = express();
const route = require("./routes");

const port = process.env.PORT || 5000;

app.use(express.json());

// routes
// app.use('경로', 라우터)

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
