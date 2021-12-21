export default (req, res, next) => {
  if (!req.user) {
    next("로그인이 필요합니다.");
    return;
  }
  next();
};
