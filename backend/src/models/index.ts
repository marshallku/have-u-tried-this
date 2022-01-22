/* eslint-disable import/extensions */
import mongoose from "mongoose";
import { PostSchema } from "./schemas/Post";
import { UserSchema } from "./schemas/User";
import { LocationSchema } from "./schemas/Location";
import { BookmarkSchema } from "./schemas/Bookmark";
import { CommentSchema } from "./schemas/Comment";

export const Post = mongoose.model("Post", PostSchema);
export const Location = mongoose.model("Location", LocationSchema);
export const User = mongoose.model("User", UserSchema);
export const Bookmark = mongoose.model("Bookmark", BookmarkSchema);
export const Comment = mongoose.model("Comment", CommentSchema);
