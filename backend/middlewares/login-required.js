/* eslint-disable import/extensions */
import { User } from "../models/index.js";
import { verifyToken } from "../utils/jwt.js";

export default (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    next("로그인이 필요합니다.");
    return;
  }
  // eslint-disable-next-line no-unused-vars
  verifyToken(token, async (error, decoded) => {
    if (error) {
      next("허용되지 않은 접근입니다.");
      return;
    }
    // console.log(typeof decoded);
    // if (typeof decoded === "undefined") {
    //   next("허용되지 않은 접근입니다.");
    // }

    req.user = await User.findOne({ googleId: decoded.data });
    next();
  });
};
