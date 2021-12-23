/* eslint-disable import/extensions */
import { verifyToken } from "../utils/jwt.js";

export default (req, res, next) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  if (!token) {
    next("로그인이 필요합니다.");
    return;
  }
  // eslint-disable-next-line no-unused-vars
  verifyToken(token, (error, decoded) => {
    if (error) {
      next("허용되지 않은 접근입니다.");
    }
    next();
  });
};
