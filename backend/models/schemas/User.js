import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: [true, "email required"],
    unique: [true, "email already registered"],
  },
  firstName: String,
  lastName: String,
  profile: String,
  source: { type: String, required: [true, "source not specified"] },
  lastVisited: { type: Date, default: new Date() },
});

export default UserSchema;
