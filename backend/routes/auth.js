/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { Router } from "express";
import dotenv from "dotenv";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import passportGoogleOAuth from "passport-google-oauth2";
import MongoDBSession from "connect-mongodb-session";
import asyncHandler from "../utils/async-handler.js";
import UserSchema from "../models/schemas/User.js";

dotenv.config();

const router = Router();
const GoogleStrategy = passportGoogleOAuth.Strategy;
const User = mongoose.model("User", UserSchema);
const passportConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
};

const MongoDBStore = MongoDBSession(session);
const sessionStore = new MongoDBStore({
  uri: "mongodb://localhost:27017/session",
  collection: "mySessions",
});

router.use(
  session({
    secret: "secret-key",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  }),
);

// passport 초기화 및 session 연결
router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new GoogleStrategy(
    passportConfig,
    (accessToken, refreshToken, profile, done) => {
      User.findOrCreate({ googleId: profile.id }, (err, user) =>
        done(err, user),
      );
    },
  ),
);

// Google OAuth
router.get("/google", (req, res) => {
  console.log("TEST");
  passport.authenticate("google", { scope: ["email", "profile"] });
});

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  },
);

router.get(
  "/test",
  asyncHandler(async (req, res) => {
    const User = mongoose.model("User", UserSchema);
    const newUser = new User({
      googleId: uuidv4(),
      email: `${uuidv4()}@gmail.com`,
      firstName: "firstName",
      lastName: "lastName",
      profileImage: "profileImage",
      lastLoginAt: new Date(),
      isActive: true,
    });
    newUser.save();
    res.json({ created: newUser });
  }),
);

// logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

export default router;
