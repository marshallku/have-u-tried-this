/* eslint-disable import/extensions */
import passport from "passport";
import googleOauth from "./strategies/passport-google.js";

export default () => {
  passport.use(googleOauth);

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
};
