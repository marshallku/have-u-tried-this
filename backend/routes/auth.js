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
  callbackURL: "http://localhost:3000/api/auth/google/callback",
  passReqToCallback: true,
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

passport.serializeUser((user, done) => {
  console.log("passport.serializeUser", user);
  done(null, user.id);
});

// // 사용자가 페이지를 방문할 때마다 호출되는 함수
// // done(null, id)로 사용자의 정보를 각 request의 user 변수에 넣어준다.
passport.deserializeUser((id, done) => {
  console.log("passport.deserializeUser", id);
  done(null, id);
});

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

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Google OAuth

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
