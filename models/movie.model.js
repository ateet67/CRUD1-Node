const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema(
    {
        name: String,
        release_date: Date,
        actors_id: { type: mongoose.Types.ObjectId, ref: 'actor' }
    },
    { timestamps: true }
);

module.exports = mongoose.model("movie", MovieSchema);
