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
