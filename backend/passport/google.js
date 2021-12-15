const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/schemas/User");
require('dotenv').config()

const config = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `http://localhost:3000/oauth/google/callback`,
};

async function findOrCreateUser({ email }) {
  const user = await User.findOne({
    email,
  });

  if (user) {
    console.log(user);
    return user;
  }

  const created = await User.create({
    googleId,
    email,
    firstName,
    lastName,
    profileImage,
  });

  return created;
}

module.exports = new GoogleStrategy(config, async (accessToken, refreshToken, profile, done) => {
  const { email } = profile._json;

  try {
    const user = await findOrCreateUser({ email })
    done(null, {
      googleId: profile.id,
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value,
    });
  } catch (e) {
    done(e, null);
  }
});