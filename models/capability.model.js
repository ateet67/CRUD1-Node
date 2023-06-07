const mongoose = require('mongoose');

const capabilities = new mongoose.Schema({
  capability: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'roles',
    }
  ]
});

module.exports = mongoose.model("capabilities", capabilities);