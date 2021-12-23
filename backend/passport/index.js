/* eslint-disable import/extensions */
import passport from "passport";
import googleOauth from "./strategies/passport-google.js";
import { User } from "../models/index.js";

export default () => {
  passport.use(googleOauth);

  passport.serializeUser((user, done) => {
    done(null, user.googleId);
  });

  // // 사용자가 페이지를 방문할 때마다 호출되는 함수
  // // done(null, id)로 사용자의 정보를 각 request의 user 변수에 넣어준다.
  passport.deserializeUser((googleId, done) => {
    User.find({ googleId }, (err, user) => {
      done(err, user);
    });
  });
};
