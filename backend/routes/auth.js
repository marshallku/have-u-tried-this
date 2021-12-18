/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { Router } from "express";
import dotenv from "dotenv";
import passport from "passport";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import passportGoogleOAuth from "passport-google-oauth20";
import asyncHandler from "../utils/async-handler.js";
import UserSchema from "../models/schemas/User.js";
import {
  getUserById,
  // getUserByEmail,
  addGoogleUser,
} from "../services/users.service.js";

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

// passport 초기화 및 session 연결
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, done) => {
  console.log("passport.serializeUser", user);
  done(null, user);
});

// // 사용자가 페이지를 방문할 때마다 호출되는 함수
// // done(null, id)로 사용자의 정보를 각 request의 user 변수에 넣어준다.
passport.deserializeUser((id, done) => {
  console.log("passport.deserializeUser", id);
  const currentUser = User.findOne({ id });
  done(null, currentUser);
});

passport.use(
  new GoogleStrategy(
    passportConfig,
    (accessToken, refreshToken, params, profiles, done) => {
      console.log({ params, profiles });
      console.log(typeof profiles.id, profiles.id);
      const googleId = profiles.id;
      const email = profiles.emails[0].value;
      const firstName = profiles.name.givenName;
      const lastName = profiles.name.familyName;
      const profile = profiles.photos[0].value;
      const source = profiles.provider;

      const currentUser = getUserById({ googleId });
      if (!currentUser) {
        const newUser = addGoogleUser({
          googleId,
          email,
          firstName,
          lastName,
          profile,
          source,
        });
        return done(null, newUser);
      }

      if (currentUser.source !== "google") {
        // return error
        return done(null, false, {
          message:
            "You have previously signed up with a different signin method",
        });
      }

      currentUser.lastVisited = new Date();
      return done(null, currentUser);
    },
  ),
);

router.get("/", (req, res) => {
  const user = req?.user || null;
  res.json({ user });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Google OAuth

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/auth?type=failed",
  }),
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
      source: "test",
      lastVisited: new Date(),
      isActive: true,
    });
    newUser.save();
    res.json({ created: newUser });
  }),
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
