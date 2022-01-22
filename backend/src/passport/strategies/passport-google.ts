/* eslint-disable import/extensions */
import dotenv from "dotenv";
import moment from "moment";
import "moment-timezone";
import passportGoogleOAuth, {
  StrategyOptionsWithRequest,
} from "passport-google-oauth20";
import { getUserById, addGoogleUser } from "../../services/users";

dotenv.config();

// 타임존 설정
moment.tz.setDefault("Asia/Seoul");

const GoogleStrategy = passportGoogleOAuth.Strategy;
const passportConfig: StrategyOptionsWithRequest = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true,
};

export default new GoogleStrategy(
  passportConfig,
  async (req, accessToken, refreshToken, profiles, done) => {
    const googleId = profiles.id;
    const email = profiles.emails[0].value;
    const firstName = profiles.name.givenName;
    const lastName = profiles.name.familyName;
    const profile = profiles.photos[0].value;
    const source = profiles.provider;

    const currentUser = await getUserById(googleId);
    if (!currentUser) {
      const newUser = await addGoogleUser({
        googleId,
        email,
        firstName,
        lastName,
        profile,
        source,
      });
      return done(null, newUser);
    }
    currentUser.save();
    return done(null, currentUser);
  },
);
