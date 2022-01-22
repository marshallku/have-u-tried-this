import { Router } from "express";
import auth from "./api/auth";
import locations from "./api/locations";
import posts from "./api/posts";
import users from "./api/users";

const app = Router();

export default () => {
  auth(app);
  locations(app);
  posts(app);
  users(app);
  return app;
};
