import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default () => {
  const mongoUri = process.env.MONGO_DB_URI;
  mongoose.connect(mongoUri);
};
