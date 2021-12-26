/* eslint-disable import/extensions */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function createToken(payload) {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      data: payload.googleId,
    },
    process.env.JWT_SECRET,
  );

  return {
    user: {
      // eslint-disable-next-line no-underscore-dangle
      id: payload._id.toString(),
      profile: payload.profile,
    },
    token,
  };
}

export async function verifyToken(token, callback) {
  return jwt.verify(token, process.env.JWT_SECRET, callback);
}
