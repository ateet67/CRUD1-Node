const mongoose = require('mongoose');

const roles = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    description: String,
    capabilities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'capabilities',
        },
    ],
});

module.exports = mongoose.model("roles", roles);