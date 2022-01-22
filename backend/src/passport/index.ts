/* eslint-disable import/extensions */
import passport from "passport";
import googleOauth from "./strategies/passport-google";

export default () => {
  passport.use(googleOauth);
};
