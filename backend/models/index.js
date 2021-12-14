const mongoose = require("mongoose");
const PostSchema = require("./schemas/Post");

exports.Post = mongoose.model("Post", PostSchema);
