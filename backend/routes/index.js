/* eslint-disable import/extensions */
import { Router } from "express";
import auth from "./api/auth.js";
import locations from "./api/locations.js";
import posts from "./api/posts.js";
import users from "./api/users.js";

const app = Router();

export default () => {
  auth(app);
  locations(app);
  posts(app);
  users(app);
  return app;
};
