import { User } from "../models/index";
import { verifyToken } from "../utils/index";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    next("로그인이 필요합니다.");
    return;
  }
  // eslint-disable-next-line no-unused-vars
  verifyToken(token, async (error: any, decoded: JwtPayload) => {
    if (error) {
      next("허용되지 않은 접근입니다.");
      return;
    }

    req.user = await User.findOne({ googleId: decoded.googleId });
    next();
    return;
  });
};
