// Input data 검증을 위한

import mongoose from "mongoose";

export default new mongoose.Schema({
  wideAddr: {
    type: String,
    required: true,
  },
  localAddr: {
    type: String,
    required: true,
  },
});
