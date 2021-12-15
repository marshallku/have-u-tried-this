/* eslint-disable import/extensions */
import mongoose from "mongoose";
import PostSchema from "./schemas/Post.js";
import LocationSchema from "./schemas/Location.js";

export const Post = mongoose.model("Post", PostSchema);
export const Location = mongoose.model("Location", LocationSchema);
