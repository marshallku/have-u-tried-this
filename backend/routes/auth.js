/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { Router } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import passport from "passport";
import moment from "moment";
import "moment-timezone";
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

// 타임존 설정
moment.tz.setDefault("Asia/Seoul");

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

passport.serializeUser((id, done) => {
  console.log("passport.serializeUser", id);
  done(null, id);
});

// // 사용자가 페이지를 방문할 때마다 호출되는 함수
// // done(null, id)로 사용자의 정보를 각 request의 user 변수에 넣어준다.
passport.deserializeUser((googleId, done) => {
  console.log("passport.deserializeUser", googleId);
  User.find({ googleId }, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    passportConfig,
    async (accessToken, refreshToken, params, profiles, done) => {
      // console.log({ params, profiles });
      // console.log(typeof profiles.id, profiles.id);
      const googleId = profiles.id;
      const email = profiles.emails[0].value;
      const firstName = profiles.name.givenName;
      const lastName = profiles.name.familyName;
      const profile = profiles.photos[0].value;
      const source = profiles.provider;
      console.log({ googleId });

      const currentUser = await getUserById(googleId);
      console.log({ currentUser });
      if (!currentUser) {
        const newUser = addGoogleUser({
          googleId,
          email,
          firstName,
          lastName,
          profile,
          source,
        });
        console.log({ newUser });
        return done(null, newUser.googleId);
      }

      if (currentUser.source !== "google") {
        // return error
        return done(null, false, {
          message:
            "You have previously signed up with a different signin method",
        });
      }

      currentUser.lastVisited = moment();
      currentUser.save();
      return done(null, currentUser.googleId);
    },
  ),
);

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

router.get(
  "/test",
  asyncHandler(async (req, res) => {
    const newUser = new User({
      googleId: uuidv4(),
      email: `${uuidv4()}@gmail.com`,
      firstName: "firstName",
      lastName: "lastName",
      profile: "profileImage",
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
