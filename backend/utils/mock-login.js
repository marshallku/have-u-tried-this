import dotenv from "dotenv";

dotenv.config();

function mockLogin(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  const user = {
    _id: process.env.AUTHOR_ID,
  };
  req.login(user, (err) => {
    next(err);
  });
}

export default mockLogin;
