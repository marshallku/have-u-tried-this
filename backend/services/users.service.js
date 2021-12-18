/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import { User } from "../models/index.js";

export const addGoogleUser = ({
  googleId,
  email,
  firstName,
  lastName,
  profile,
  source,
}) => {
  const user = new User({
    googleId,
    email,
    firstName,
    lastName,
    profile,
    source,
  });
  return user.save();
};

export const getUserById = (googleId) => {
  User.find({ googleId }).then((err, user) => {
    if (err) {
      console.error(err);
    }
    return user;
  });
};

export const getUserByEmail = (email) => {
  User.find({ email }).then((err, user) => {
    if (err) {
      console.error(err);
    }
    return user;
  });
};

export default getUserById;
