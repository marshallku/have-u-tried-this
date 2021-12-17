/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import { User } from "../models/index.js";

export const addGoogleUser = ({
  id,
  email,
  firstName,
  lastName,
  profilePhoto,
}) => {
  const user = new User({
    id,
    email,
    firstName,
    lastName,
    profilePhoto,
    source: "google",
  });
  return user.save();
};

export const getUsers = (id) => User.find({ id });

export const getUserByEmail = (email) => {
  User.findOne({ email });
};

export default getUsers;
