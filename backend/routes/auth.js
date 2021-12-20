/* eslint-disable import/extensions */
import { Router } from "express";
import passport from "passport";

const router = Router();

// Get current authorized user
router.get("/", (req, res) => {
  const user = req?.user || null;
  res.json({ user });
});

// Google OAuth2
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/auth?type=failed",
  }),
  (req, res) => {
    res.redirect("/api/auth");
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
