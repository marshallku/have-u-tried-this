const mongoose = require("mongoose");
const PostSchema = require("./schemas/Post");
const LocationSchema = require("./schemas/Location");

exports.Post = mongoose.model("Post", PostSchema);
exports.Location = mongoose.model("Location", LocationSchema);
