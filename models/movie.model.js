const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            message: "name is required."
        },
        release_date: {
            type: Date,
            required: true,
            message: "release_date is requuired"
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("movie", MovieSchema);
