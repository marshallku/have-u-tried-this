const { Router } = require("express");
const router = Router();

// 라우터 예시 코드
router.get("/", (req, res) => {
  res.send("Home");
});

module.exports = router;
