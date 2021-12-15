// Input data 검증을 위한

const { Schema } = require("mongoose");

module.exports = new Schema({
  wide_addr: {
    type: String,
    required: true,
  },
  local_addr: {
    type: String,
    required: true,
  },
});
