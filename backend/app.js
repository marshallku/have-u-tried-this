const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

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
