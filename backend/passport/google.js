/* eslint-disable import/extensions */
import passport from "passport";
import mongoose from "mongoose";
import UserSchema from "../models/schemas/User.js";

const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const User = mongoose.model("User", UserSchema);

const passportConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
};

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
