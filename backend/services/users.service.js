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

export const getUserById = async (googleId) => {
  console.log("getUserById:", { googleId });
  // return User.find({ googleId }).then((user, err) => {
  //   if (err) {
  //     console.error("ERROR getUserById:", { err, user });
  //   }
  //   console.log("Already in db");
  //   return user;
  // });
  const user = await User.findOne({ googleId });
  return user;
};

export const getUserByEmail = (email) => {
  console.log("getUserByEmail:", { email });
  return User.findOne({ email }).then((err, user) => {
    if (err) {
      console.error(err);
    }
    return user;
  });
};

export default getUserById;
