import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../models/index";
import { verifyToken } from "../utils/index";

export default (req: Request, res: Response, next: NextFunction) => {
  let token: string;
  try {
    // eslint-disable-next-line prefer-destructuring
    token = req.headers.authorization.split(" ")[1];
  } catch (err) {
    next();
    return;
  }
  // eslint-disable-next-line no-unused-vars
  verifyToken(token, async (error: any, decoded: JwtPayload) => {
    if (error) {
      next("허용되지 않은 접근입니다.");
      return;
    }

    req.user = await User.findOne({ googleId: decoded });
    next();
  });
};
