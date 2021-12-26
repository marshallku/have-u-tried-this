/* eslint-disable import/extensions */
import { User } from "../models/index.js";
import { verifyToken } from "../utils/index.js";

export default (req, res, next) => {
  let token;
  try {
    // eslint-disable-next-line prefer-destructuring
    token = req.headers.authorization.split(" ")[1];
  } catch (err) {
    next();
    return;
  }
  // eslint-disable-next-line no-unused-vars
  verifyToken(token, async (error, decoded) => {
    if (error) {
      next("허용되지 않은 접근입니다.");
      return;
    }

    req.user = await User.findOne({ googleId: decoded.data });
    next();
  });
};
