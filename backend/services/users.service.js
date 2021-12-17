/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import { User } from "../models/index.js";

export const addGoogleUser = ({
  googleId,
  email,
  firstName,
  lastName,
  profilePhoto,
}) => {
  const user = new User({
    googleId,
    email,
    firstName,
    lastName,
    profilePhoto,
    source: "google",
  });
  return user.save();
};

export const getUsers = (googleId) => User.find({ googleId });

export const getUserByEmail = (email) => {
  User.findOne({ email });
};

export default getUsers;
