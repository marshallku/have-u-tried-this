// Input data 검증을 위한

import { Schema } from "mongoose";

export default new Schema({
  wideAddr: {
    type: String,
    required: true,
  },
  localAddr: {
    type: String,
    required: true,
  },
});
