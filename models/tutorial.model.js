const { default: mongoose } = require("mongoose");

var schema = mongoose.Schema(
  {
    title: String,
    description: String,
    published: Boolean
  },
  { timestamps: true }
);

module.exports = mongoose.model("tutorial", schema);