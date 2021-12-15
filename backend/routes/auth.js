const { Router } = require('express');
const passport = require('passport');
const router = Router();

router.get("/oauth/google/callback", (req, res) => {
  res.send("Home");
});
