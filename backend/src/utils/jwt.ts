import jwt, { SignOptions, VerifyCallback } from "jsonwebtoken";
import dotenv from "dotenv";
import { IUserDocument } from "../models/schemas/User";

dotenv.config();

export async function createToken(user: IUserDocument) {
  const payload = { googleId: user.googleId };
  const signOpts: SignOptions = {
    expiresIn: "7d",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, signOpts);

  return {
    user: {
      // eslint-disable-next-line no-underscore-dangle
      id: user._id.toString(),
      profile: user.profile,
    },
    token,
  };
}

export async function verifyToken(token: string, callback: VerifyCallback) {
  return jwt.verify(token, process.env.JWT_SECRET, callback);
}
