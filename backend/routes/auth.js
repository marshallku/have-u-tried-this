/* eslint-disable import/extensions */
import { Router } from "express";
import passport from "passport";

import { createToken } from "../utils/jwt.js";

const router = Router();

// Google OAuth2
router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  async (req, res) => {
    const user = await createToken(req.user);
    res.cookie("user", JSON.stringify(user));
    res.redirect("/?redirected=true");
  },
);

// logout
router.get("/logout", (req, res) => {
  // req.logout();
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

export default router;
